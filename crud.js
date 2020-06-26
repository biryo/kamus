
var jsstoreCon = new JsStore.Instance(new Worker("scripts/jsstore.worker.js"));
var limit = limit ;
window.onload = function () {
    refreshTableData();
    registerEvents();
    initDb();
    displayHome();
    // addrecord();
};

async function initDb() {
    var isDbCreated = await jsstoreCon.initDb(getDbSchema());
    if (isDbCreated) {
        
    }
    else {
        
    }
}

function getDbSchema() {
    var table = {
        name: 'Profile',
        columns: {
            id: { autoIncrement: true, primaryKey: true },
            name: { dataType: "string" },
            email: { dataType: "string" },
            password: { dataType: "string" },
            status: { dataType: "string" },
            limit: { dataType: "number" },
            id_user: { dataType: "number" }
        }
    }

    var tableTrx = {
        name: 'Trx',
        columns: {
            id: { autoIncrement: true, primaryKey: true },
            tgl: { dataType: "string" },
            user: { dataType: "string" },
            idplesetan: { dataType: "string" }
        }
    }

    var db = {
        name: 'DbPlesetan',
        tables: [table,tableTrx]
    }
    return db;
}

async function registerEvents() {
    var results = await jsstoreCon.select({
                        from: "Profile"
                    });

    if (results.length == 0) {
            showForm();  
        }

    $('#btnSubmit').click(function()
    {
        if (results.length == 0) {
            addprofile();
            addrecord();
        }

        $('#myModal').modal('hide');
        
        refreshTableData();
    });
}

async function selek(){
    var results = await jsstoreCon.select({
                        from: "Profile"
                    });
    return results
}

//This function refreshes the table
function refreshTableData() {
    jsstoreCon.select({
        from: 'Profile'
    }).then(function(profiles) {
        profiles.forEach(function (profile) { 
                limit = profile.limit;
                if (profile.email == '-'){
                    $('#profile').html(`
                              <a class="nav-link dropdown-toggle" href="#" id="username" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Guest
                              </a>
                              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                    <a class="dropdown-item" href="#">Status Freemium</a>
                                    <a class="dropdown-item" href="#" id="limit">Limit `+profile.limit+`</a>
                                        <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#" onclick="displayLogin()">Login</a>            
                              </div>
                    `);
                    
                }else{
                    $('#profile').html(`
                              <a class="nav-link dropdown-toggle" href="#" id="username" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                `+profile.name+`
                              </a>
                              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                    <a class="dropdown-item" href="#" id="email">Email `+profile.email+`</a>
                                    <a class="dropdown-item" href="#" id="limit">Status `+profile.status+`</a>
                                    <a class="dropdown-item" href="#" id="limit">Limit `+profile.limit+`</a>
                                        <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#" onclick="logout()">Logout</a>            
                              </div>
                    `);
                }

                $('#addClose').html(`                    
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </div>
                `);
        })
    }).catch(function (err) {
        console.error(err);
    })
}
 // CRUD Database Profile

//Insert
async function addprofile() {
    var results = await jsstoreCon.select({
                        from: "Profile"
                    });

    if (results.length == 0) {   
        var profile ={
                      name: 'Guest',
                      email: '-',
                      status: 'Freemium',
                      limit: 50,
                     };
        var noOfDataInserted = await jsstoreCon.insert({
            into: 'Profile',
            values: [profile]
        });
        refreshTableData();  
    } 
}

//Update
async function addrecord() {
    var results = await jsstoreCon.select({
                        from: "Profile"
                    });

    console.log(results)
    console.log('utama addrecord')
    var datenow = new Date().toISOString().slice(0, 10);

    if (results.length == 0) {
        addtrx();

    console.log('if addrecord')
    }else{

    console.log('else addrecord')
        jsstoreCon.select({
            from: "Trx"
        }).then(function(trx){

    console.log('then addrecord')
            if (trx[0].tgl != datenow) {    
                

                    if(results[0].status == 'Bronze'){
                        updateprofile(150);   
                    }
                    else if(results[0].status == 'Silver'){
                        updateprofile(250);
                    }
                    else if(results[0].status == 'Gold'){
                        updateprofile(500);
                    }
                    else if(results[0].status == 'Premium'){
                        updateprofile(1000);
                    }else{
                        updateprofile(50);                
                    }

                    console.log('Kepanggil addrecord otw updateprofile');
            }else{

    console.log('false then  addrecord')
            }
        }); 
    }    
}

async function updateprofile(limits) {
    var results = await jsstoreCon.select({
        from: "Profile"
    });
        
                        if (!limits) {
                            jsstoreCon.update({
                                in: 'Profile',
                                set: {
                                    limit: results[0].limit - 1,
                                },
                                where: {
                                    id: 1
                                }
                            });            
                        }else{
                            jsstoreCon.update({
                                in: 'Profile',
                                set: {
                                    limit: parseInt(limits),
                                },
                                where: {
                                    id: 1
                                }
                            });  

                                tgl = new Date().toISOString().slice(0, 10);
                                jsstoreCon.update({
                                    in: 'Trx',
                                    set: {
                                        tgl: tgl,
                                        id_user:results[0].id_user,
                                        idplesetan:"1"
                                    },
                                    where: {
                                        id: 1
                                    }
                                });  

                                        console.log(tgl)
                                        console.log('Update limit dan tgl')           
                        }
    refreshTableData();
}


async function produks(){
        var datauser = await jsstoreCon.select({
                    from: "Profile"
                });

        console.log(datauser)

        $.ajax({
          url: 'https://452138aee55a.ngrok.io/sw/db_spell.php',
          type:'get',
          dataType:'json',
          data:{
            'operasi':'produk'
          },
          success: function(result){
            if(result.length == 0){
              console.log('gagal')
            }
            else{
                var clr = ['bg-primary','bg-success','bg-warning','bg-info','bg-danger'];
                var i = 0
                
              $.each(result,function (i,value){
                    $('#dta_plesetan').append(`
                            <div class="card text-white `+ clr[i] +` mb3" style="width: 18rem;">
                              <div class="card-header">`+ value.nm_prduk +`</div>
                              <div class="card-body">
                                <p class="card-text text-center">Limit +`+ value.info_prduk +`/Hari</p>
                                <div class="text-right">Rp.`+value.hrg+`,-</div>
                              </div>
                              <form action="midtrans-php-master/examples/snap/checkout-process.php" method="POST" target="hidden-form">
                                    <input type="hidden" name="prduk" value="`+value.nm_prduk+`">
                                    <input type="hidden" name="detail" value="`+value.info_prdukk+`">
                                    <input type="hidden" name="hrg" value="`+value.hrg+`">
                                    <input type="hidden" name="id_prduk" value="`+value.id_prduk+`">
                                    <input type="hidden" name="id_user" value="`+datauser[0].id_user+`">                              
                              <div class="card-footer text-white text-right"><button type="sumbit" class="btn btn-outline-dark" onclick="byr()">Buy</button></div></form>
                            </div>                            
                    `);
                    i++
              });
            }
          } 
        });
}

// Akhir CRUD Database Profile

// CRUD Database Trx
// Insert
async function addtrx(tgl) {
    var date 
    var results = await jsstoreCon.select({
                        from: "Trx"
                    });

                     if (results.length == 0) {
                                    if (tgl) {
                                         date = tgl;
                                    }else{
                                         date = new Date().toISOString().slice(0, 10);   
                                    }
                        var trx ={
                                    tgl: date,
                                 };

                        var noOfDataInserted = await jsstoreCon.insert({
                            into: 'Trx',
                            values: [trx]
                        });

                        }else{

                        }

        var tglskrng = new Date().toISOString().slice(0, 10);
        console.log(tglskrng)
        if (date != tglskrng) {
            addrecord();
        }else{
            refreshTableData();
        }        
}

async function guest_tgl(tgl,id) {
            
            jsstoreCon.update({
                in: 'Trx',
                set: {
                    tgl: tgl,
                    idplesetan: id
                },
                where: {
                    id: 1
                }
            }); 
}    
// Akhir CRUD Database TRX

//Login
async function sent_limit(nm,stts,email,pass,limits,id_user){
                var results = await jsstoreCon.select({
                        from: "Profile"
                    });

                if (email != '-' && results.length == 1) {  
                      jsstoreCon.select({
                            from: "Trx"
                        }).then(function(hsl){
                            $('#tgl_g').val(hsl[0].tgl)
                            $('#idpltan_g').val(hsl[0].idplesetan)

                    $('#limit_g').val(results[0].limit)
                    $('#nama_g').val(results[0].name)
                    $('#email_g').val(results[0].email)
                    $('#stts_g').val(results[0].stts)
                    $("#sent_limit_g").submit();
                        });
                }else{
                    if (results.length == 0) {
                            var profile ={
                                    name: nm,
                                    email: email,
                                    password: pass,
                                    status: stts,
                                    limit: parseInt(limits),
                                    id_user:parseInt(id_user)
                            };
                        var noOfDataInserted = await jsstoreCon.insert({
                            into: 'Profile',
                            values: [profile]
                        });

                    }
                }

                var noOfDataUpdated = jsstoreCon.update({
                    in: 'Profile',
                    set: {
                        name: nm,
                        email: email,
                        password: pass,
                        status: stts,
                        limit: parseInt(limits),
                        id_user: parseInt(id_user)
                    },
                    where: {
                        id: 1
                    }
                });

                refreshTableData();
                
                $('#myModal').modal('hide');
                $('#regisemail').modal('hide');
}
//AKhir Login

//Logout
async function logout(){
                var results = await jsstoreCon.select({
                    from: "Profile"
                });

                jsstoreCon.select({
                    from: "Trx"
                }).then(function(hsl){
                    $('#tgl_g').val(hsl[0].tgl)
                    $('#idpltan_g').val(hsl[0].idplesetan)
                    
                    $('#limit_g').val(results[0].limit)
                    $('#nama_g').val(results[0].name)
                    $('#email_g').val(results[0].email)
                    $('#stts_g').val(results[0].status)
                    $("#sent_limit_g").submit();
                });
}
// AKhir logout