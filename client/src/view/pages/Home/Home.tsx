import { useState } from 'react';
import styled from 'styled-components';

const Home = () => {
    const [searchData, setSearchData] = useState({
        from: '',
        to: '',
        departDate: '',
        returnDate: '',
        passengers: 1
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search logic here
        console.log('Search data:', searchData);
    };

    return (
        <HomeContainer>
            <HeroSection>
                <h1>Find Your Perfect Flight</h1>
                <p>Search hundreds of airlines and destinations</p>
            </HeroSection>

            <SearchForm onSubmit={handleSubmit}>
                <InputGroup>
                    <InputWrapper>
                        <label>From</label>
                        <input
                            type="text"
                            placeholder="Departure city"
                            value={searchData.from}
                            onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <label>To</label>
                        <input
                            type="text"
                            placeholder="Arrival city"
                            value={searchData.to}
                            onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
                        />
                    </InputWrapper>
                </InputGroup>

                <InputGroup>
                    <InputWrapper>
                        <label>Depart</label>
                        <input
                            type="date"
                            value={searchData.departDate}
                            onChange={(e) => setSearchData({ ...searchData, departDate: e.target.value })}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <label>Return</label>
                        <input
                            type="date"
                            value={searchData.returnDate}
                            onChange={(e) => setSearchData({ ...searchData, returnDate: e.target.value })}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <label>Passengers</label>
                        <input
                            type="number"
                            min="1"
                            value={searchData.passengers}
                            onChange={(e) => setSearchData({ ...searchData, passengers: parseInt(e.target.value) })}
                        />
                    </InputWrapper>
                </InputGroup>

                <SearchButton type="submit">
                    Search Flights
                </SearchButton>
            </SearchForm>
        </HomeContainer>
    );
};

const HomeContainer = styled.div`
    min-height: 100vh;
    padding: 2rem;
    background: linear-gradient(135deg,rgb(168, 169, 194) 0%,rgb(207, 230, 191) 100%);
`;

const HeroSection = styled.div`
    text-align: center;
    color: white;
    margin-bottom: 3rem;
    color:black;

    h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.2rem;
        opacity: 0.9;
    }
`;

const SearchForm = styled.form`
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const InputWrapper = styled.div`
    flex: 1;
    margin-bottom: 1rem;
    margin-right: 2rem;
    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #374151;
        
    }

    input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        font-size: 1rem;
        border: 1px solid black;


        &:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
    }
`;

const SearchButton = styled.button`
    width: 100%;
    padding: 1rem;
    background: #6366f1;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background: #4f46e5;
    }
`;

export default Home;