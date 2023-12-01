<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$id = trim($data['id']);
$nama = trim($data['nama']);
$no_hp = trim($data['no_hp']);
http_response_code(201);
if ($nama != '' and $no_hp != '') {
    $query = mysqli_query($koneksi, "update kontak set nama='$nama',no_hp='$no_hp' where
id='$id'");
    $pesan = true;
} else {
    $pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($koneksi);
