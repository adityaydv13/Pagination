import { useState, useEffect } from "react";
import axios from "axios";
import "./datalist.css"; 

const DataList = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async (page) => {
        try {
            const response = await axios.get(`http://localhost:5000/accessData?page=${page}`);
            if (response.data.success) {
                setData(response.data.data);
                setTotalPages(response.data.pagination.totalPages);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    return (
        <div className="container">
            <h2>Stored Data</h2>

            {data.length > 0 ? (
                data.map((item, index) => (
                    <div key={index} className="item">
                        <p><strong>Name:</strong> {item.name}</p>
                        <p><strong>Email:</strong> {item.email}</p>
                        <p><strong>Message:</strong> {item.message}</p>
                    </div>
                ))
            ) : (
                <p className="text-center">No data available.</p>
            )}

            {/* Pagination Controls */}
            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default DataList;
