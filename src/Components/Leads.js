import React from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import {
  faPhone,
  faTrashCan,
  faPen,
  faEye,
  faMessage,
  faPlus,
  faFilter,
  faMagnifyingGlass,
  faSort,
  faClose,
} from "@fortawesome/free-solid-svg-icons";

const image =
  "https://a.storyblok.com/f/191576/1200x800/faa88c639f/round_profil_picture_before_.webp";
const Leads = () => {
  const [search, setSearch] = React.useState("");

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    setProductsToDisplay(data);
  }, [data]);
  const [productsToDisplay, setProductsToDisplay] = React.useState(data);

  const handleSearchChange = (event) => {
    const searchString = event.target.value.toLowerCase();
    setSearch(searchString);

    const filteredProducts = data.filter((product) => {
      return Object.values(product)
        .join("")
        .toLowerCase()
        .includes(searchString);
    });

    setProductsToDisplay(filteredProducts);
  };

  const customCell = (row) => {
    return (
      <div className="flexa">
        <img src={image} alt="Profile" className="profile-img" />
        <span className="ml-2">{row.name}</span>
      </div>
    );
  };

  const customTagsCell = (row) => {
    const tags = row.tags;
    return (
      <div className="tags">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
    );
  };

  const [show, setShow] = React.useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      cell: customCell,
    },
    {
      name: "Company",
      selector: (row) => row.cname,
      sortable: true,
    },
    {
      name: "Leads Score",
      selector: (row) => row.lscore,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
    },
    {
      name: "Tags",
      selector: (row) => row.tags,
      sortable: true,
      cell: customTagsCell,
    },
    {
      name: "Create Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <ul class="list-inline">
          <li class="list-inline-item">
            <a href="javascript:void(0);">
              <FontAwesomeIcon icon={faPhone} />
            </a>
          </li>
          <li class="list-inline-item">
            <a href="javascript:void(0);">
              <FontAwesomeIcon icon={faMessage} />
            </a>
          </li>
          <li class="list-inline-item">
            <a href="javascript:void(0);">
              <FontAwesomeIcon icon={faEye} />
            </a>
          </li>
          <li class="list-inline-item">
            <FontAwesomeIcon icon={faPen} />
          </li>
          <li class="list-inline-item">
            <FontAwesomeIcon icon={faTrashCan} />
          </li>
        </ul>
      ),
    },
  ];

  const handleSelectedRowsChange = (selectedRows) => {
    const selectedProduct = selectedRows.selectedCount;
    if (selectedProduct > 0) {
      const rowselect = selectedRows.selectedRows;
      rowselect.map((item) => {
        console.log(item.id);
      });
    }
  };

  const [formData, setFormData] = React.useState({
    name: "",
    cname: "",
    lscore: 0,
    phone: "",
    location: "",
    tags: [],
    date: "2024-04-02T04:35:40.001000",
  });

  const handleChange = (e) => {
    if (e.target.name === "date") {
      const inputDate = new Date(e.target.value);
      const formattedDate = inputDate.toISOString().slice(0, 10);
      setFormData({
        ...formData,
        [e.target.name]: formattedDate,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSelectChange = (e) => {
    if (e.target.selectedOptions && e.target.selectedOptions.length > 0) {
      const selectedTags = Array.from(e.target.selectedOptions).map(
        (option) => option.value
      );
      setFormData({
        ...formData,
        tags: selectedTags,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to post data");
      }

      console.log("Data posted successfully");

      const fetchData = async () => {
        try {
          const response = await axios.get("http://15.207.21.52/");
          setData(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
      setProductsToDisplay(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Modal show={show} id="bandya" onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Lead</Modal.Title>
          <Button className="customclose" onClick={handleClose}>
            <FontAwesomeIcon icon={faClose} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="col-lg-12">
              <label className="form-label">Name</label>
              <input required
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-12">
              <label className="form-label">Company</label>
              <input required
                type="text"
                className="form-control"
                name="cname"
                value={formData.cname}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label">Leads Score</label>
              <input required
                type="number"
                className="form-control"
                name="lscore"
                value={formData.lscore}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label">Phone</label>
              <input required
                type="number"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-12">
              <label className="form-label">Location</label>
              <input required
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-12">
              <label className="form-label">Tags</label>
              <select required
                multiple
                className="form-control"
                value={formData.tags}
                onChange={handleSelectChange}
              >
                <option value="example">Example Tag</option>
              </select>

              
            </div>
            <div className="col-lg-12">
              {/* <label className="form-label">Create Date</label> */}
              <input
                type="hidden"
                className="form-control"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="btn btn-info add-lead someother"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            className="btn btn-info add-lead"
            onClick={() => {
              handleSubmit();
              handleClose();
            }}
          >
            Add Lead
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="lead-top">LEADS</div>

      <div className="custom-table">
        <div className="filtesss">
          <div className="alinnners">
            <input
              type="text"
              className="form-control"
              placeholder="Search for..."
              value={search}
              onChange={handleSearchChange}
            />
            <span className="search-icon">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
          </div>
          <div className="together">
            <button type="button" className="btn btn-info filter">
              <FontAwesomeIcon icon={faFilter} /> Fliters
            </button>
            <div>
              <button
                type="button"
                className="btn btn-success add-btn add-lead"
                onClick={handleShow}
              >
                <FontAwesomeIcon icon={faPlus} /> Add Leads
              </button>
            </div>
          </div>
        </div>
        <div className="dataTable-container">
          <DataTable
            columns={columns}
            data={productsToDisplay}
            pagination
            paginationTotalRows={productsToDisplay.length}
            striped
            fixedHeader
            highlightOnHover
            selectableRows
            onSelectedRowsChange={handleSelectedRowsChange}
          />
        </div>
      </div>
    </>
  );
};

export default Leads;
