CREATE VIEW karyawan_ezyh AS
SELECT
    nip,
    nama,
    CASE
        WHEN Gend = 'L' THEN 'Laki - Laki'
        WHEN Gend = 'P' THEN 'Perempuan'
        ELSE ''
    END AS Gend,
    '12 April 2023' AS "Tanggal lahir"
FROM
    karyawan;
