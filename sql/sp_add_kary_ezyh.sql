DELIMITER //
CREATE PROCEDURE sp_add_kary_ezyh(IN nip VARCHAR(255), IN nama VARCHAR(255))
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        INSERT INTO log_trx_api (keterangan) VALUES ('Gagal menambahkan data karyawan');
    END;

    START TRANSACTION;

    -- Cek apakah NIP sudah ada dalam tabel karyawan
    IF EXISTS (SELECT * FROM karyawan WHERE nip = nip) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'NIP sudah ada dalam tabel karyawan';
    ELSE
        -- Tambahkan data ke tabel karyawan
        INSERT INTO karyawan (nip, nama) VALUES (nip, nama);

        -- Jika berhasil, catat ke dalam log_trx_api
        INSERT INTO log_trx_api (keterangan) VALUES ('Berhasil menambahkan data karyawan');
    END IF;

    COMMIT;
END;
//
DELIMITER ;