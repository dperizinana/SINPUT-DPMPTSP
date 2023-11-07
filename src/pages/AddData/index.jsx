import React, { useEffect, useState } from "react";
import "./AddData.css";
import Cookies from "js-cookies";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddData = () => {
  const [form, setForm] = useState({
    no: "",
    nama_pemohon: "",
    nama_bangunan: "",
    lokasi_bangunan: "",
    kecamatan: "",
    kelurahan: "",
    jenis_bangunan: "",
    unit: "",
    lantai: "",
    no_sk: "",
    tgl_sk: "",
  });
  const [file, setFile] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const navigation = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nama_pemohon", form.nama_pemohon);
    formData.append("nama_bangunan", form.nama_bangunan);
    formData.append("lokasi_bangunan", form.lokasi_bangunan);
    formData.append("kecamatan", form.kecamatan);
    formData.append("kelurahan", form.kelurahan);
    formData.append("jenis_bangunan", form.jenis_bangunan);
    formData.append("unit", form.unit);
    formData.append("lantai", form.lantai);
    formData.append("no_sk", form.no_sk);
    formData.append("tgl_sk", form.tgl_sk);
    if (file) {
      formData.append("file", file);
    }
    try {
      const respon = await axios.post(
        "https://rich-red-eagle-cap.cyclic.app/reports/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.getItem("token")}`,
          },
        }
      );
      alert("sukses membuat laporan!");
      navigation("/");
    } catch (error) {
      console.log(error);
      alert("error membuat laporan!");
    }
  };

  const token = Cookies.getItem("token");

  useEffect(() => {
    if (!token) {
      navigation("/login");
    } else {
      return;
    }
  }, [token]);
  return (
    <div className="container-add">
      <form className="add-form" onSubmit={handleSubmit}>
        <h1 className="text-center">Tambah Data PBG DPMPTSP</h1>
        <div className="form-add-group">
          <div className="form-left">
            <div>
              <label>Nama Pemohon:</label>
              <input
                value={form.nama_pemohon}
                name="nama_pemohon"
                type="text"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Nama Bangunan:</label>
              <input
                value={form.nama_bangunan}
                name="nama_bangunan"
                type="text"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Lokasi Bangunan:</label>
              <input
                value={form.lokasi_bangunan}
                name="lokasi_bangunan"
                type="text"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Kecamatan:</label>
              <input
                value={form.kecamatan}
                name="kecamatan"
                type="text"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Kelurahan:</label>
              <input
                value={form.kelurahan}
                name="kelurahan"
                type="text"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-right">
            <div>
              <label>Jenis Bangunan:</label>
              <input
                value={form.jenis_bangunan}
                name="jenis_bangunan"
                type="text"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Unit:</label>
              <input
                value={form.unit}
                name="unit"
                type="text"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Lantai:</label>
              <input
                value={form.lantai}
                name="lantai"
                type="text"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>No. SK:</label>
              <input
                value={form.no_sk}
                name="no_sk"
                type="text"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Tanggal SK:</label>
              <input
                value={form.tgl_sk}
                name="tgl_sk"
                type="date"
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="input-file">
          <input
            name="file"
            type="file"
            onChange={handleFileChange}
            accept=".pdf"
            required
          />
        </div>
        <div className="btn-add-container">
          <button className="login-btn" type="submit">
            Add data
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddData;
