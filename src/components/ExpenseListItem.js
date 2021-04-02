import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import numeral from "numeral";
import { Link } from "react-router-dom";

const ExpenseListItem = ({ id, description, amount, createdAt, dispatch }) => (
    <Link to={`/edit/${id}`} className="list-item">
        <div>
            <h3 className="list-item__title">{description}</h3>
            <span className="list-item__sub-title">{moment(createdAt).format("MMMM Do, YYYY")}</span>
        </div>
        <h3 className="list-item__data">{numeral(amount / 100).format("$0,0.00")}</h3>
    </Link>
);

export default connect()(ExpenseListItem);
