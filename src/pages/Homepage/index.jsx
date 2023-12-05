import { Link, useNavigate } from "react-router-dom";
import "./homepage.css";
import Table from "../../Table";
import React, { useEffect, useState } from "react";
import Cookise from "js-cookies";
import moment from "moment/moment";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import Paginasi from "../../Paginasi";
import FiturDownload from "./FiturDownload";
import Footer from "../../Footer";
const Homepage = () => {
  const token = Cookise.getItem("token");
  const navigation = useNavigate();
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const itemsPerPage = 10;
  const columns = React.useMemo(
    () => [
      {
        Header: "No.",
        accessor: "no",
      },
      {
        Header: "Nama Pemohon",
        accessor: "nama_pemohon",
      },
      {
        Header: "Nama Bangunan",
        accessor: "nama_bangunan",
      },
      {
        Header: "Lokasi Bangunan",
        accessor: "lokasi_bangunan",
      },
      {
        Header: "Kecamatan",
        accessor: "kecamatan",
      },
      {
        Header: "Kelurahan",
        accessor: "kelurahan",
      },
      {
        Header: "Jenis Bangunan",
        accessor: "jenis_bangunan",
      },
      {
        Header: "Unit",
        accessor: "unit",
      },
      {
        Header: "Lantai",
        accessor: "lantai",
      },
      {
        Header: "No. SK",
        accessor: "no_sk",
      },
      {
        Header: "Tanggal SK",
        accessor: "tgl_sk",
      },
      {
        Header: "Action",
        accessor: "action",
      },
    ],
    []
  );

  const handledelete = async (id) => {
    try {
      const respon = await axios.delete(
        `https://rich-red-eagle-cap.cyclic.app/reports/${id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookise.getItem("token")}`,
          },
        }
      );
      alert("sukses menghapus data!");
      window.location.reload();
    } catch (error) {
      alert("error menghapus data!");
    }
  };
  const { downloadAndRename } = FiturDownload();
  const formatData = (responseData) => {
    return responseData.reverse().map((item, index) => ({
      no: index + 1,
      nama_pemohon: item.nama_pemohon,
      nama_bangunan: item.nama_bangunan,
      lokasi_bangunan: item.lokasi_bangunan,
      kecamatan: item.kecamatan,
      kelurahan: item.kelurahan,
      jenis_bangunan: item.jenis_bangunan,
      unit: item.unit,
      lantai: item.lantai,
      no_sk: item.no_sk,
      tgl_sk: moment(item.tgl_sk).format("MM/DD/YYYY"),
      action: (
        <>
          <div className="action">
            <PencilSquareIcon
              onClick={() => navigation(`/update-data/${item._id}`)}
              className="style-icon primary"
            />
            <TrashIcon
              onClick={() => handledelete(item._id)}
              className="style-icon secondary"
            />
            <ArrowDownTrayIcon
              onClick={() => downloadAndRename(item.file_url)}
              className="style-icon thirdy"
            />
          </div>
        </>
      ),
    }));
  };

  const handleSortByMonth = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleSortByYear = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  // Fungsi untuk sorting dan filtering data
  const filterAndSortData = () => {
    let filteredData = reports;

    if (selectedMonth) {
      filteredData = filteredData.filter(
        (item) => moment(item.tgl_sk).format("M") === selectedMonth
      );
    }

    if (selectedYear) {
      filteredData = filteredData.filter(
        (item) => moment(item.tgl_sk).format("YYYY") === selectedYear
      );
    }

    if (searchKeyword) {
      filteredData = filteredData.filter((item) => {
        const values = Object.values(item);
        return values.some((value) =>
          value.toString().toLowerCase().includes(searchKeyword.toLowerCase())
        );
      });
    }

    // Perhitungkan halaman aktif
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Potong data sesuai dengan halaman aktif
    return filteredData.slice(startIndex, endIndex);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    if (!token) {
      navigation("/login");
    } else {
      return;
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      const respon = await axios.get(
        "https://rich-red-eagle-cap.cyclic.app/reports",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const formattedData = formatData(respon.data.data);

      setReports(formattedData);
    };
    fetchData();
  }, []);
  return (
    <>
      <nav className="navbar">
        <h1 className="title">SINPUT-BG</h1>
        <Link to={"/login"}>
          <button onClick={() => Cookise.removeItem("token")}>Logout</button>
        </Link>
      </nav>
      <main>
        <div className="add-data">
          <div>
            <div className="search-input">
              <MagnifyingGlassIcon className="search-input-icon" />
              <input
                placeholder="Cari data"
                type="text"
                name=""
                id=""
                onChange={handleSearch}
              />
            </div>
            <div className="sort">
              <div className="custom-select">
                <select name="" id="" onChange={handleSortByMonth}>
                  <option value="">Sort by month</option>
                  <option value="1">Januari</option>
                  <option value="2">Februari</option>
                  <option value="3">Maret</option>
                  <option value="4">April</option>
                  <option value="5">Mei</option>
                  <option value="6">Juni</option>
                  <option value="7">Juli</option>
                  <option value="8">Agustus</option>
                  <option value="9">September</option>
                  <option value="10">Oktober</option>
                  <option value="11">November</option>
                  <option value="12">Desember</option>
                </select>
              </div>
              <div className="custom-select">
                <select name="" id="" onChange={handleSortByYear}>
                  <option value="">Sort by year</option>
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </select>
              </div>
            </div>
          </div>

          <Link className="btn-add-container" to={"/add-data"}>
            <button className="btn-add">
              <PlusIcon className="icon-add" /> Tambah data
            </button>
          </Link>
        </div>
        <section className="section">
          {reports && (
            <Table columns={columns} data={filterAndSortData(reports)} />
          )}
        </section>
        <section className="paginasi-container">
          <Paginasi
            totalItems={reports.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </section>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Homepage;
