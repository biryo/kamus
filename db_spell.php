<?php 

$server = "localhost";
$username = "root";
$password = "";
$database = "plesetan";
$con = mysqli_connect($server,$username,$password) or die("Koneksi Error :".mysqli_connect_error);
mysqli_select_db($con,$database) or die("KOneksi database Error".mysqli_error($con));

@$operasi = $_GET['operasi'];
switch ($operasi) {

	case 'Search': // Search
		@$key = strtolower($_GET['key']);

		$query_key = mysqli_query($con,"SELECT * FROM `kbbp` WHERE `kata_baku` ='$key'") or die(mysqli_error($con));
		$data_baku = array();
		$data_baku = mysqli_fetch_assoc($query_key);
		$spells = $data_baku['ejaan'];
		$pecah = explode("-", $spells);

		$max_word = max(array_map('strlen', $pecah));
		
		foreach ($pecah as $spell) {
			$spel = strlen($spell);
			if ($spel == $max_word) {
				$query_spell = mysqli_query($con,"SELECT * FROM `kbbp` WHERE `kata_baku` LIKE '%$spell%'") or die(mysqli_error($con));
				break;
			}
		}
		

		$api_p = array();
		while($data = mysqli_fetch_assoc($query_spell)){
			similar_text($data["kata_baku"],$key,$percent);
			if ($percent > 75 and $percent < 85 ) {	
						$api_p[]=$data;	
					}
		}
		echo json_encode($api_p);
		break;

	case 'Insert': // Insert Data

			@$kosakata = $_GET['kosakata'];
			@$ejaan = $_GET['ejaan'];
			@$arti = $_GET['arti'];

			$query_insert = mysqli_query($con,"INSERT INTO kbbp (kata_baku, ejaan, arti_katanya) VALUES ('$kosakata', '$ejaan', '$arti');");

		if($query_insert){
			$pesan = array();
			$pesan[] = 'Data Berhasil Tersimpan';
			echo json_encode($pesan);
		}
		else{

		}
		break;

	default:
		
	break;		
}

?>