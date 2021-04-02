import React from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            description : props.expense ? props.expense.description : "",
            note : props.expense ? props.expense.note : "",
            amount : props.expense ? (props.expense.amount / 100).toString() : "",
            createdAt : props.expense? moment(props.expense.createdAt) : moment(),
            calendarFocused : false,
            error : ""
        }
    }
    onDescriptionChange = (e) => {
        const description = e.target.value
        this.setState(()=>({description}))
    }
    onNoteChange = (e) => {
        const note = e.target.value
        this.setState(()=>({note}))
    }
    onAmountChange = (e) => {
        const amount = e.target.value
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(()=>({amount}))
        }
    }
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(()=>({ createdAt }))
        }
    }
    onFocusChange = ({ focused }) => {
        this.setState(()=>({calendarFocused : focused}))
    }
    onSubmit=(e)=>{
        e.preventDefault();
        if (!this.state.description.trim() || !this.state.amount.trim()) {
            this.setState(()=>({error : "Please fill out description and amount."}))    
        }
        else {
            this.setState(()=>({error : ""}))
            this.props.onSubmit({
                description : this.state.description,
                amount : parseFloat(this.state.amount , 10) * 100,
                createdAt : this.state.createdAt.valueOf(),
                note : this.state.note
            })
        }
    }
    render() {
        return (
                <form className="form" onSubmit={this.onSubmit}>
                    {this.state.error && <p className="form__error">{this.state.error}</p>}
                    <input 
                        type="text"
                        className="text-input"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.onDescriptionChange}
                        autoFocus
                    /> 
                    <input 
                        type="text"
                        className="text-input"
                        placeholder="Amount"
                        value={this.state.amount}
                        onChange={this.onAmountChange}
                    />
                    <SingleDatePicker
                        id="CreatedAt"
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={()=>false}
                    />
                    <textarea 
                        placeholder="Add Note For Your Expense. (Optional)"
                        value={this.state.note}
                        className="textarea"
                        onChange={this.onNoteChange}
                    ></textarea>
                    <div>
                        <button className="button">Save Expense</button>
                    </div>
                </form>
        )
    }
}