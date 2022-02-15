import React from 'react'
import '../editPatientProfile/editPatientProfile.css';


class Billing extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div className="container--patientProfileSections">
                    <div className="container__h2--patientProfileSection">
                        <h2>Billing</h2>
                    </div>
                    <div className="container--patientProfileSections--content-editPatientProfile">
                        <div>
                        <form className="form--editPatientProfile">
                            <div className="container--form-items--editPatientProfile">
                                <div className="form--item--editPatientProfile">
                                    <label className="label--editPatientProfile" for="invoiceDate">Invoice Date</label>
                                    <input className="input--editPatientProfile--text" type="date" id="invoiceDate" name="healthCard" placeholder="Enter Invoice Date"></input>
                                </div>
                                <div className="form--item--editPatientProfile">
                                    <label className="label--editPatientProfile" for="invoiceFrom">Invoice From</label>
                                    <input className="input--editPatientProfile--text" type="text" id="invoiceFrom" name="invoiceFrom" placeholder="Enter Invoice From"></input>
                                </div>
                                <div className="form--item--editPatientProfile">
                                    <label className="label--editPatientProfile" for="description">Description</label>
                                    <textarea className="input--prescriptions--textarea" type="text" id="description" name="description" placeholder="Enter Description" rows="3"></textarea>
                                </div>
                                <div className="form--item--editPatientProfile">
                                    <label className="label--editPatientProfile" for="amount">Amount</label>
                                    <input className="input--editPatientProfile--text" type="number" id="amount" name="amount" placeholder="Enter Amount"></input>
                                </div>
                            </div>
                            <input className="input--editPatientProfile--button" type="submit" value="Save"></input>
                        </form>
                        </div>

                        <table className="table--editPatientProfile-history">
                            <tr>
                                <th>Invoice Date</th>
                                <th>Invoice From</th>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                            <tr>
                                <td>Example Date</td>
                                <td>Example Doctor</td>
                                <td>Example Message Here</td>
                                <td>Example Amount 20.00</td>
                            </tr>
                        </table>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Billing;