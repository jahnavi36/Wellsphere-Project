import React from 'react'
import './editPatientProfile.css';

class EditCareProvProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state={userID: this.props.careProvider.userId, password: this.props.careProvider.password, firstName:this.props.careProvider.firstName, lastName: this.props.careProvider.lastName, phoneNumber: this.props.careProvider.phoneNumber, email: this.props.careProvider.email, hospital: this.props.careProvider.hospital, permissions: this.props.careProvider.permissions ,message:''}
        this.updateCareProv = this.updateCareProv.bind(this)
        this.handleChange = this.handleChange.bind(this)
       }
    
    updateCareProv = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:4000/careProvider/`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({userID: this.state.userID, password: this.state.password, firstName:this.state.firstName, lastName: this.state.lastName, phoneNumber: this.state.phoneNumber, email: this.state.email, hospital: this.state.hospital, permissions: this.state.permissions })
        })
        if(response.status=== 200){
                this.setState({message: 'Care Provider information successfully updated'})
            } else {
                
                this.setState({message: `Error with update`})
            }
    }  

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value})
      }
       
    render() {
        return (
            <React.Fragment>
                <div className="container--patientProfileSections">
                    <div className="container__h2--patientProfileSection">
                        <h2>Edit Care Provider Profile</h2>
                    </div>
                    <div className="container--patientProfileSections--content-editPatientProfile">
                        <div>
                        <form className="form--editPatientProfile" onSubmit={this.updateCareProv}>
                            <div className="container--form-items--editPatientProfile">
                                <div className="form--item--editPatientProfile">
                                    <label className="label--editPatientProfile" htmlFor="userId">User Id</label>
                                    <input className="input--editPatientProfile--text--readonly" type="number" id="userID" name="userId" placeholder="Edit User Id" defaultValue={this.props.careProvider.userId} readOnly></input>
                                </div>
                                <div className="form--item--editPatientProfile">
                                    <label className="label--editPatientProfile" htmlFor="password">Password</label>
                                    <input className="input--editPatientProfile--text" type="password" id="password" name="password" placeholder="Edit Password"  defaultValue={this.props.careProvider.password} onChange={this.handleChange}></input>
                                </div>
                                <div className="form--item--editPatientProfile">
                                    <label className="label--editPatientProfile" htmlFor="firstName">First Name</label>
                                    <input className="input--editPatientProfile--text" type="text" id="firstName" name="firstName" placeholder="Edit First Name" defaultValue={this.props.careProvider.firstName} onChange={this.handleChange}></input>
                                </div>
                                <div className="form--item--editPatientProfile">
                                    <label className="label--editPatientProfile" htmlFor="lastName">Last Name</label>
                                    <input className="input--editPatientProfile--text" type="text" id="lastName" name="lastName" placeholder="Edit Last Name" defaultValue={this.props.careProvider.lastName} onChange={this.handleChange}></input>
                                </div>
                                <div className="form--item--editPatientProfile">
                                    <label className="label--editPatientProfile" htmlFor="phoneNumber">Phone Number</label>
                                    <input className="input--editPatientProfile--text" type="text" id="phoneNumber" name="phoneNumber" placeholder="Edit Phone Number" defaultValue={this.props.careProvider.phoneNumber} onChange={this.handleChange}></input>
                                </div>
                                <div className="form--item--editPatientProfile">
                                    <label className="label--editPatientProfile" htmlFor="email">Email</label>
                                    <input className="input--editPatientProfile--text" type="email" id="email" name="email" placeholder="Edit Email" defaultValue={this.props.careProvider.email} onChange={this.handleChange}></input>
                                </div>
                                <div className="form--item--editPatientProfile">
                                    <label className="label--editPatientProfile" htmlFor="hospital">Hospital</label>
                                    <input className="input--editPatientProfile--text" type="text" id="hospital" name="hospital" placeholder="Edit Hospital" defaultValue={this.props.careProvider.hospital} onChange={this.handleChange}></input>
                                </div>
                                <div className="form--item--editPatientProfile">
                                    <label className="label--editPatientProfile" htmlFor="permissions">Permissions</label>
                                    <select className="input--editPatientProfile--text" id="permissions" name="permissions" defaultValue={this.props.careProvider.permissions} onChange={this.handleChange}>
                                        <option value="admin">admin</option>
                                        <option value="careProvider">careProvider</option>
                                    </select>
                                </div>
                            </div>
                            <input className="input--editPatientProfile--button" type="submit" ></input>
                        </form>
                        </div>
                        {/* <h2 className="title--edit-history">Edit History</h2>

                        <table className="table--editPatientProfile-history">
                            <tr>
                                <th>User ID</th>
                                <th>Password</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Hospital</th>
                                <th>Permissions</th>
                            </tr>
                            <tr>
                                <td>Text</td>
                                <td>Text</td>
                                <td>Text</td>
                                <td>Text</td>
                                <td>Text</td>
                                <td>Text</td>
                                <td>Text</td>
                                <td>Text</td>
                            </tr>
                        </table> */}
                        <div className="sucessMessage">
                            {this.state.message}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default EditCareProvProfile;