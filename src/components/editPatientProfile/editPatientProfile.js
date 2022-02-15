import React from 'react'
import './editPatientProfile.css';

class editPatientProfile extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = { birthDay: '', showHistoryTable: false, healthCardNumber: this.props.patient.healthCardNumber, birthDate: this.props.patient.birthDate, phone: this.props.patient.phone, address: this.props.patient.address, city: this.props.patient.city, province: this.props.patient.province, firstName: this.props.patient.firstName, lastName: this.props.patient.lastName, message:'', history: [] }
        this.handleChange = this.handleChange.bind(this)
        this.updatePatient = this.updatePatient.bind(this)
        
    }

    async componentDidMount() {
        if (typeof this.props.patient.birthDate !== "undefined") {

            let birthDate = new Date(this.props.patient.birthDate)
            let year = birthDate.getFullYear();
            let month = birthDate.getMonth() + 1;
            let monthFormatted
            month < 10 ? monthFormatted = `0${month}` : monthFormatted = `${month}`

            let day = birthDate.getDate();
            let dayFormatted
            day < 10 ? dayFormatted = `0${day}` : dayFormatted = `${day}`

            let dayFormat = `${year}-${monthFormatted}-${dayFormatted}`
            this.setState({ birthDay: dayFormat })

            const response = await fetch(`http://localhost:4000/log/${this.props.patient.healthCardNumber}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            if (response.status === 200) {
                const data = await response.json()
                this.setState({ showHistoryTable: true })
                this.setState({history: data})
            }

        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    updatePatient = async (e) => {
        e.preventDefault();
        // verify change in patient data
        let changes = []
        let oldBirthDate = new Date(this.props.patient.birthDate)
        let newBirthDate = new Date(this.state.birthDate)
        
        if (oldBirthDate.valueOf() != newBirthDate.valueOf()) { changes.push('Birth Date') }
        if (this.state.phone !== this.props.patient.phone) { changes.push('Phone') }
        if (this.state.address !== this.props.patient.address) { changes.push('address') }
        if (this.state.city !== this.props.patient.city) { changes.push('city') }
        if (this.state.province !== this.props.patient.province) { changes.push('province') }
        if (this.state.lastName !== this.props.patient.lastName) { changes.push('Last Name') }
        if (this.state.firstName !== this.props.patient.firstName) { changes.push('First Name') }
        console.log(changes)
        console.log(this.props.patient.activeUser)
        // post to log if changes identified
        if (changes.length > 0) {
            for (let i = 0; i < changes.length; i++) {
        await fetch(`http://localhost:4000/log/`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ healthCardNumber: `${this.props.patient.healthCardNumber}`, attribute: changes[i], userID: `${this.props.patient.activeUser}` })
                })
            }
        }

        // get data to update state
        const noteUpdate = await fetch(`http://localhost:4000/log/${this.props.patient.healthCardNumber}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            if (noteUpdate.status === 200) {
                const data = await noteUpdate.json()
                this.setState({ showHistoryTable: true })
                this.setState({history: data})
            }

        // post to patient
        
        const response = await fetch(`http://localhost:4000/patient/`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ healthCardNumber: `${this.state.healthCardNumber}`, birthDate: this.state.birthDate, phone: this.state.phone, firstName: this.state.firstName, lastName: this.state.lastName, address: this.state.address, city: this.state.city, province: this.state.province})
        })
        if(response.status=== 200){
            this.setState({message: 'Patient information successfully updated'})
        } else {
            
            this.setState({message: `Error with updating patient information`})
        }


    }

    render() {
        return (
            <React.Fragment>
                <div className="container--patientProfileSections">
                    <div className="container__h2--patientProfileSection">
                        <h2>Edit Patient Profile</h2>
                    </div>
                    <div className="container--patientProfileSections--content-editPatientProfile">
                        <div>
                            <form className="form--editPatientProfile" onSubmit={this.updatePatient}>
                                <div className="container--form-items--editPatientProfile">
                                    <div className="form--item--editPatientProfile">
                                        <label className="label--editPatientProfile" htmlFor="editHealthCard">Health Card</label>
                                        <input className="input--editPatientProfile--text--readonly" type="number" id="healthCardNumber" name="healthCard" placeholder="Edit Health Card" defaultValue={this.props.patient.healthCardNumber} readOnly></input>
                                    </div>
                                    <div className="form--item--editPatientProfile">
                                        <label className="label--editPatientProfile" htmlFor="firstName">First Name</label>
                                        <input className="input--editPatientProfile--text" type="tel" id="firstName" name="firstname" placeholder="First Name" defaultValue={this.props.patient.firstName} onChange={this.handleChange}></input>
                                    </div>
                                    <div className="form--item--editPatientProfile">
                                        <label className="label--editPatientProfile" htmlFor="lastName">Last Name</label>
                                        <input className="input--editPatientProfile--text" type="tel" id="lastName" name="lastname" placeholder="Last Name" defaultValue={this.props.patient.lastName} onChange={this.handleChange}></input>
                                    </div>
                                    <div className="form--item--editPatientProfile">
                                        <label className="label--editPatientProfile" htmlFor="editDOB">DOB</label>
                                        <input className="input--editPatientProfile--text" type="date" id="birthDate" name="DOB" placeholder="Edit DOB" defaultValue={this.state.birthDay} onChange={this.handleChange}></input>
                                    </div>
                                    <div className="form--item--editPatientProfile">
                                        <label className="label--editPatientProfile" htmlFor="editPhone">Phone</label>
                                        <input className="input--editPatientProfile--text" type="tel" id="phone" name="phone" placeholder="Edit Phone" defaultValue={this.props.patient.phone} onChange={this.handleChange}></input>
                                    </div>
                                    
                                    <div className="form--item--editPatientProfile">
                                        <label className="label--editPatientProfile" htmlFor="editAddress">Address</label>
                                        <input className="input--editPatientProfile--text" type="text" id="address" name="address" placeholder="Edit Address" defaultValue={this.props.patient.address} onChange={this.handleChange}></input>
                                    </div>
                                    <div className="form--item--editPatientProfile">
                                        <label className="label--editPatientProfile" htmlFor="editCity">City</label>
                                        <input className="input--editPatientProfile--text" type="text" id="city" name="city" placeholder="Edit City" defaultValue={this.props.patient.city} onChange={this.handleChange}></input>
                                    </div>
                                    <div className="form--item--editPatientProfile">
                                        <label className="label--editPatientProfile" htmlFor="editProvince">Province</label>
                                        <input className="input--editPatientProfile--text" type="text" id="province" name="province" placeholder="Edit Province" defaultValue={this.props.patient.province} onChange={this.handleChange}></input>
                                    </div>
                                </div>
                                <input className="input--editPatientProfile--button" type="submit"></input>
                            </form>
                        </div>
                        <div className="sucessMessage">
                            {this.state.message}
                        </div>
                        <h2 className="title--edit-history">Edit History</h2>
                        {!this.state.showHistoryTable &&
                            <div> Patient has no history
                                </div>
                        }
                        {this.state.showHistoryTable &&

                            <table className="table--editPatientProfile-history">
                                <tbody>
                                <tr>
                                    <th>Date</th>
                                    <th>Changed By</th>
                                    <th>Update</th>
                                </tr>
                                {this.state.history.length > 0 &&                               
                                this.state.history.map(note => {
                                    return (
                                        <tr key={this.state.history.indexOf(note)}>
                                            <td>{note.date}</td>
                                            <td>{note.firstName} {note.lastName}</td>
                                            <td>{note.attribute} was updated</td>
                                            </tr>
                                    )
                                })
                                }
                                
                                </tbody>
                            </table>
                        }

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default editPatientProfile;