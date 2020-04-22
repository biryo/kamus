
var jsstoreCon = new JsStore.Instance(new Worker("scripts/jsstore.worker.js"));

window.onload = function () {
    refreshTableData();
    registerEvents();
    initDb();
    displayHome();
};

async function initDb() {
    var isDbCreated = await jsstoreCon.initDb(getDbSchema());
    if (isDbCreated) {
        showForm();
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
            lvl: { dataType: "number" }
        }
    }

    var db = {
        name: 'My-Db',
        tables: [table]
    }
    return db;
}

function registerEvents() {
    $('#btnSubmit').click(function () {
            addprofile();
    });
}

//This function refreshes the table
function refreshTableData() {
    var htmlString = "";
    jsstoreCon.select({
        from: 'Profile'
    }).then(function (profiles) {
        profiles.forEach(function (profile) {
            htmlString += "<tr ItemId=" + profile.id + "><td>" +
                profile.name + "</td><td id='lvl'>" +
                profile.lvl + "</td><td>" +
                "<a href='#' class='edit'>Edit</a></td>" +
                "<td><a href='#' class='delete''>Delete</a></td>";
        })
        $('#table_profil').html(htmlString);
    }).catch(function (err) {
        console.error(err);
    })
}

async function addprofile() {
    var profile ={
                  name: $('#nama').val(),
                  lvl: 1
                 };
    var noOfDataInserted = await jsstoreCon.insert({
        into: 'Profile',
        values: [profile]
    });
    if (noOfDataInserted === 1) {

    }
    refreshTableData();
}

async function updateprofile(ulvl) {
    var noOfDataUpdated = await jsstoreCon.update({
        in: 'Profile',
        set: {
            lvl: ulvl
        },
        where: {
            id: 1
        }
    });
    refreshTableData();
}