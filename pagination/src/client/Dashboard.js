import { useState } from "react";
import axios from "axios";
import "./app.css"; // Import the CSS file
// import { set } from "mongoose";

const Dashboard = () => {
  const [msg,setmsg]=useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if(!formData.name || !formData.email||!formData.message)
        // {
        //   setmsg("require all fields");
        //   return;
        // }

        try {
            const response = await axios.post("http://localhost:5000/dataEnter", formData);
            if (response.data.success) {
              setmsg("Data submitted successfully!");

              setFormData({ name: "", email: "", message: "" }); // Reset form
          } else {
              setmsg("Failed to submit data.");
          }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="form-container">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <input className="input-field" type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
                <input className="input-field" type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
                <textarea className="input-field" name="message" placeholder="Your Message" onChange={handleChange} required></textarea>
                <button className="submit-btn" type="submit">Submit</button>
                <p>{msg}</p>
            </form>
        </div>
    );
};

export default Dashboard;
