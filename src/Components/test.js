import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "react-bootstrap";

function Test() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    cname: "",
    lscore: 0,
    phone: "",
    location: "",
    tags: [],
    date: new Date().toISOString().slice(0, 10),
  });

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

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
      const selectedTags = Array.from(e.target.selectedOptions).map((option) => option.value);
      setFormData({
        ...formData,
        tags: selectedTags,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://15.207.21.52/", {
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button className="btn btn-info add-lead someother" onClick={handleShow}>
        Add Lead
      </button>

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
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-12">
              <label className="form-label">Company</label>
              <input
                type="text"
                className="form-control"
                name="cname"
                value={formData.cname}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label">Leads Score</label>
              <input
                type="number"
                className="form-control"
                name="lscore"
                value={formData.lscore}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6">
              <label className="form-label">Phone</label>
              <input
                type="tel"className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-12">
              <label className="form-label">Location</label>
             <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-12">
              <label className="form-label">Tags</label>
              <select
                multiple
                className="form-control"
                value={formData.tags}
                onChange={handleSelectChange}
              >
                <option value="example">Example Tag</option>
              </select>
            </div>
            <div className="col-lg-12">
              <label className="form-label">Create Date</label>
              <input
                type="date"
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
    </>
  );
}

export default Test;