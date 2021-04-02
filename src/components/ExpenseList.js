import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";
import selectVisible from "../selectors/getVisibleExpenses";

const ExpenseList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="visible-for-mobile">Expenses</div>
            <div className="visible-for-desktop">Expenses</div>
            <div className="visible-for-desktop">Amount</div>
        </div>
        <div className="list-body">
            {props.expenses.length === 0 ? (
                <div className="list-item list-item--message">
                    <span>No Expenses</span>
                </div>
            ) : (
                props.expenses.map((expense) => {
                    return <ExpenseListItem key={expense.id} {...expense} />;
                })
            )}
        </div>
    </div>
);

const mapStoreToProps = (state) => {
    return {
        expenses: selectVisible(state.expenses, state.filters),
    };
};

export default connect(mapStoreToProps)(ExpenseList);
