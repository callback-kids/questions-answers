/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from 'react';
import axios from 'axios';
import query from './routes';
import Container from 'react-bootstrap/Container';
import QuestionList from '../components/QuestionList.jsx';
import SearchBar from '../components/SearchBar.jsx';
// import SubmitButton from '../components/SubmitButton.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qList: [],
      searchInput: '',
      productName: '',
      id: Math.floor(Math.random() * 1000),
      // const id: 6, 12;
    };
    this.isHelpfulQ = this.isHelpfulQ.bind(this);
    this.isHelpfulA = this.isHelpfulA.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.productName = this.productName.bind(this);
  }
  componentDidMount() {
    this.getProductQs();
    this.productName();
  };

  getProductQs() {
    const id = this.state.id;
    query.reqProductQs(id, (err, data) => {
      if (err) {
        throw err;
      } else {
        this.setState({qList: data.data.results});
      }
    });
  }

  productName() {
    const id = this.state.id;
    axios.get(`http://52.26.193.201:3000/products/${id}`)
        .then((res) => {
          this.setState({productName: res.data.name});
        })
        .catch((err) => console.error(err));
  }

  isHelpfulQ(questID) {
    axios.put(`http://52.26.193.201:3000/qa/question/${questID}/helpful`)
        .then((res) => {
          this.setState({});
        })
        .catch((err) => console.error(err));
    console.log('questionID:', questID);
    // query.reqIsHelpfulQ(questID, (err, data) => {
    //   if (err) {
    //     throw err;
    //   } else {
    //     this.setState({});
    //   }
    // });
  }

  isHelpfulA(answerID) {
    axios.put(`http://52.26.193.201:3000/qa/answer/${answerID}/helpful`)
        .then((res) => {
          this.setState({});
        })
        .catch((err) => console.error(err));
    console.log('answerID:', answerID);
    // query.reqIsHelpfulA(answerID, (err, data) => {
    //   if (err) {
    //     throw err;
    //   } else {
    //     this.setState({});
    //   }
    // });
  }

  reportAnswer(answerID) {
    // pass to individual answer (isHelpfulA)
    console.log('reportANSW:', answerID);
  }

  handleSearchChange(e) {
    this.setState({searchInput: e.target.value.toLowerCase()});
  }

  render() {
    const {qList, searchInput, productName} = this.state;
    let filteredQuestions = qList;
    if (searchInput.length >= 3) {
      filteredQuestions = qList.filter((q) => q.question_body.toLowerCase().includes(searchInput.toLowerCase()));
    }
    return (
      <div id="body">
        <Container>
          <br></br>
          <div className="jumbotron">
            <h1 id="header">Questions and Answers</h1>
            <br></br>
            <SearchBar
              searchInput={searchInput}
              handleSearchChange={this.handleSearchChange}
            />
            <div>
            </div>
            <br></br>
            <QuestionList
              qList={filteredQuestions}
              isHelpfulQ={this.isHelpfulQ}
              isHelpfulA={this.isHelpfulA}
              productName={productName}
            />
            {/* <SubmitButton/> */}
          </div>
        </Container>
      </div>
    );
  };
};

export default App;
