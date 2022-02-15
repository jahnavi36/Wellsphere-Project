import React from 'react'
import './notesDiagnoses.css';

class notesDiagnoses extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <div className="container--patientProfileSections">
                    <div className="container__h2--patientProfileSection">
                        <h2>Notes &amp; Diagnoses</h2>
                    </div>
                    <div className="container--patientProfileSections--content">
                        <div>
                        <form className="form--notesDiagnoses">
                            <textarea className="input--notesDiagnoses--text" type="text" id="" name="" Placeholder="New Note..."></textarea>
                            <input className="input--notesDiagnoses--button" type="submit" value="Submit Note"></input>
                            <p className="error">Error: Note cannot be blank.</p>
                        </form>
                        </div>
                        <div className="container--notesHistory">
                            <div className="container--singleNote">
                                <div className="container--dateAuthor">
                                    <p>2020-01-01</p>
                                    <p>Dr.Martin</p>
                                </div>
                                <div className="container--note">
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac metus risus. Curabitur magna magna, bibendum et dui dignissim, tempor tempor sapien.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default notesDiagnoses;