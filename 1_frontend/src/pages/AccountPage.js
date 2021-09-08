import React, { useEffect, useState } from 'react';
import axios from 'axios';

// styles
import './AccountPage.css';
import TeamCard from '../components/TeamCard';

const AccountPage = () => {

      // ------ signup form
const [teamTitle, setTeamTitle] = useState('');
const [teamCity, setTeamCity] = useState('');
const [teamCountry, setTeamCountry] = useState('');
const [teamImage, setTeamImage] = useState('');
const [teamList, setTeamList] = useState([]);


    const postNewTeam = (e) => {
        e.preventDefault();
        e.target.reset();

        const user = localStorage.getItem('user')
        const teamObject =
            {
                title: teamTitle,
                city: teamCity,
                country: teamCountry,
                image: teamImage
            }
        
        axios
            .post(`http://localhost:5000/api/teams/add/${user}`, teamObject
        ).then((response) => 
        {
            console.log(response)
            setTeamTitle('');
            setTeamCity('');
            setTeamCountry('');
            setTeamImage('');

            if (response.status === 200) {
                prompt("team created")
            } else {
                prompt("error");
            }
        })
        .catch((err) => console.log(err));
    };

    useEffect(() => {
        document.title = 'Account page'
        axios
            .get('http://localhost:5000/api/teams')
            .then(res => setTeamList(res.data));
    }, [])

    return (
        <main>
            <h2 className="my-account">My Account</h2>
            <h2>Current teams you can vote for</h2>
            <div className="team-container">
            {teamList.map(team => 
                (
                <TeamCard key={team._id} title={team.title} city={team.city} country={team.country} image={team.image}/>
                )
            )}
            </div>
            <h2>Submit your new team</h2>
            <form onSubmit={ postNewTeam} id="addNewTeamForm" className="form">
                <div className="form-control">
                    <label className="form-label" htmlFor="teamTitle">
                        Title
                    </label>
                    <input
                        className="form-input"
                        type="text" 
                        required
                        value={teamTitle}
                        onChange={(e) => setTeamTitle(e.target.value)}
                    />
                </div>

                <div className="form-control">
                    <label className="form-label" htmlFor="teamCity">
                        City
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        id="teamCity"
                        required
                        value={teamCity}
                        onChange={(e) => setTeamCity(e.target.value)}
                    />
                </div>

                <div className="form-control">
                    <label className="form-label" htmlFor="teamCountry">
                        Country
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        required
                        value ={teamCountry}
                        onChange={(e) => setTeamCountry(e.target.value)}
                    />
                </div>

                <div className="form-control">
                    <label className="form-label" htmlFor="teamImage">
                        Image url
                    </label>
                    <input
                        className="form-input"
                        type="text"
                        required
                        value={teamImage}
                        onChange={(e)=> setTeamImage(e.target.value)}
                    />
                </div>

                <div className="button-control">
                    <button
                        type="submit"
                        value="Add Team"
                        className="btn-new-team btn-primary-submit">Add Team</button>
                </div>
            </form>
        </main>
    )
}

export default AccountPage
