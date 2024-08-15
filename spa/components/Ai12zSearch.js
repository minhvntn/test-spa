import React, { useState, useEffect } from 'react';

const Ai12zSearch = () => {
  const [ai12zOrgId, setAi12zOrgId] = useState('6554fc4f1f60f5397a5b8799');
  const [ai12zProjectId, setAi12zProjectId] = useState('6589d4a64eaa69131bd4fec2');
  const [a12zEndPoint, setA12zEndPoint] = useState('https://api.ai12z.net');
  const [apiKey, setApiKey] = useState('4e650dddd641ccedf1ba7e39f11b3108b6c07dcdfadf275e07ad9d3991f56eca');
  const [projectName, setProjectName] = useState('');
  const [conversationID, setConversationID] = useState('');
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [isRequestInProgress, setIsRequestInProgress] = useState(false);
  const [pendingSearch, setPendingSearch] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [followUpChecked, setFollowUpChecked] = useState(false);
  const [modalActive, setModalActive] = useState(true);
  const [firstAiQuestion, setFirstAiQuestion] = useState(true);
  const [isDisabledInput, setIsDisabledInput] = useState(false);

  const truncateString = (str, slength) => {
    return str.length > slength ? str.substring(0, slength) + '...' : str;
  };



  const assetTypeIcons = {
    pdf: <i className="fa-solid fa-file-pdf"></i>,
    doc: <i className="fa-solid fa-file-word"></i>,
    docx: <i className="fa-solid fa-file-word"></i>,
    csv: '📊',
    image: '🖼️',
    video: '🎥',
    web: '🌐',
    'unknown asset type': '❓',
  };

  const sanitizeInput = (input) => {
    const div = document.createElement('div');
    div.textContent = input;
    return encodeURIComponent(div.innerHTML);
  };

  const openAiModal = () => {
    setModalActive(true);
  };

  const closeAiModal = () => {
    // setModalActive(false);
    setIsRequestInProgress(false);
    setPendingSearch(null);
    setSearchText('');
    setFollowUpChecked(false);
    setResults([]);
    setChatMessages([]);
    const globalSearch = document.querySelector('.global-search');
    if (globalSearch) {
      globalSearch.classList.remove('is-ready', 'is-active');
    }
  };

  const fetchSuggestions = () => {
    if (searchText.length > 1 && !followUpChecked) {
      const resultsAiContainer = document.getElementById('searchAiResults');
      resultsAiContainer.style.display = 'block';
      const chatContainer = document.getElementById('chatContainer');
      chatContainer.style.display = 'none';
      if (!isRequestInProgress) {
        setIsRequestInProgress(true);
        postQuestion(searchText);
      } else {
        setPendingSearch(searchText);
      }
    }
  };

  const displayResults = (docs) => {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.style.display = 'none';
    
    setResults(docs.map((doc) => (
      <div className="result-item" key={doc.link}>
        <span>{assetTypeIcons[doc.asset_type] || <i className="fa-solid fa-file"></i>}</span>
        <a href={doc.link} target="_blank" rel="noopener noreferrer" className="ai-as-you-type-source-link">
          {truncateString(doc.title, 65)}
        </a>
        <br />
        {truncateString(doc.description, 130)}
      </div>
    )));
  };

  const postQuestion = async (query) => {
    const data = {
      org_id: ai12zOrgId,
      project_id: ai12zProjectId,
      apiKey: apiKey,
      query: query,
      num_docs: 4,
    };

    try {
      const response = await fetch(`${a12zEndPoint}/api/titledescriptionlink`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      displayResults(jsonResponse.docs);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setTimeout(() => {
        setIsRequestInProgress(false);
        if (pendingSearch) {
          if (searchText === pendingSearch) {
            postQuestion(pendingSearch);
          }
          setPendingSearch(null);
        }
      }, 1000);
    }
  };

  function showAiCustomAlert() {
    document.getElementById('customAlertBox').style.display = 'block';
  }

  const askAI = async () => {
    const chatContainer = document.getElementById('chatContainer');
    if (firstAiQuestion) {
      setFirstAiQuestion(false);
      setChatMessages([]);
      
    }
    setIsDisabledInput(true);
    chatContainer.style.display = 'none';
    const resultsAiContainer = document.getElementById('searchAiResults');
    resultsAiContainer.style.display = 'none';

    const spinnerIcon = document.createElement('i');
    spinnerIcon.className = 'fa fa-spinner fa-spin';
    spinnerIcon.style.marginRight = '5px'; // Add some space between the spinner and the text
    askButton.insertBefore(spinnerIcon, askButton.firstChild); // Insert the spinner before the "Ask AI" text

    // const checkBox = document.getElementById('qAiFollowUp');
    // var conversationID = '';
    // if (checkBox.checked) {
    //   conversationID = document.getElementById('conversationID').value
    // }

    // clearFeedbackButtons();

    // const searchAiBox = document.getElementById('searchAiBox');
    // const askButton = document.querySelector('.ask-button');
    // const query = searchAiBox.value;
    // if (query.length < 2) {
    //   showAiCustomAlert();  //
    //   searchAiBox.disabled = false;
    //   askButton.disabled = false;
    //   return;
    // }

    const userMessage = (
      <div className="user-message" key={searchText}>
        <img src="/user-icon.png" alt="user-icon" className="user-icon" />
        <div className="message-bubble">{searchText}</div>
      </div>
    );
    setChatMessages([...chatMessages, userMessage]);

    const data = {
      org_id: ai12zOrgId,
      project_id: ai12zProjectId,
      apiKey: apiKey,
      query: searchText,
      format: 'html',
      conversation_id: followUpChecked ? conversationID : '',
    };

    try {
      const response = await fetch(`${a12zEndPoint}/api/rag`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setConversationID(result.conversation_id);

      let aiMessage;
      if (result.did_answer) {
        setFollowUpChecked(true);
        const iconHtml = assetTypeIcons[result.asset_type] || <i className="fa-solid fa-file"></i>;

        aiMessage = (
          <div className="ai-message" key={result.insight_id}>
            <img src="/ai-icon.png" alt="ai-icon" className="ai-icon" />
            <div className="message-bubble test">
              <p dangerouslySetInnerHTML={{ __html: result.answer }} />
              {result.link && result.title && (
                <>
                  <span>{iconHtml}</span>
                  <a href={result.link} target="_blank" rel="noopener noreferrer" className="ai-source-link">
                    {truncateString(result.title, 48)}
                  </a>
                </>
              )}
              <br />
              <button
                className="thumbs-up-button feedback-button"
                onClick={() => thumbsUpClicked(result.insight_id)}
              >
                👍
              </button>
              <button
                className="thumbs-down-button feedback-button"
                onClick={() => thumbsDownClicked(result.insight_id)}
              >
                👎
              </button>
            </div>
          </div>
        );
      } else {
        aiMessage = (
          <div className="ai-message" key={result.insight_id}>
            <div className="message-bubble">
            <p dangerouslySetInnerHTML={{ __html: result.answer }} />
            </div>
          </div>
        );
      }

      setChatMessages((prevMessages) => [...prevMessages, aiMessage]);
      chatContainer.style.display = 'block';
      
      setIsDisabledInput(false);
      const spinnerIcon = askButton.querySelector('.fa-spinner');
      if (spinnerIcon) {
        askButton.removeChild(spinnerIcon);
      }
      setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 500);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    } finally {
      setSearchText('');
    }
  };

  const thumbsUpClicked = (insight_id) => {
    sendFeedback(insight_id, 1);
  };

  const thumbsDownClicked = (insight_id) => {
    sendFeedback(insight_id, -1);
  };

  const sendFeedback = async (insight_id, feedback) => {
    const data = {
      insight_id: insight_id,
      feedback: feedback,
    };

    try {
      await fetch(`${a12zEndPoint}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const clearFeedbackButtons = () => {
    const feedbackButtons = document.querySelectorAll('.feedback-button'); // Assuming you add this class to your thumbs up/down buttons
    feedbackButtons.forEach(button => {
      button.parentNode.removeChild(button); // Remove each button from the parent node
    });
    // Clear the feedback buttons (this function needs to be adjusted based on your implementation)
  };

  const handleKeyDown = (event) => {
    if (event.metaKey && event.key === 'k') {
      event.preventDefault();
      openAiModal();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    const urlParams = new URLSearchParams(window.location.search);
    setAi12zOrgId(sanitizeInput(urlParams.get('org')) || ai12zOrgId);
    setAi12zProjectId(sanitizeInput(urlParams.get('proj')) || ai12zProjectId);
    setApiKey(sanitizeInput(urlParams.get('apiKey')) || apiKey);
    setProjectName(sanitizeInput(urlParams.get('pn')) || '');
    setA12zEndPoint(sanitizeInput(urlParams.get('mode')) === 'local'
      ? 'http://127.0.0.1:5000'
      : sanitizeInput(urlParams.get('mode')) === 'dev'
      ? 'https://dev-api.ai12z.net'
      : 'https://api.ai12z.net'
    );

    return () => {
      // document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      {modalActive && (
        <div className="modal-ai-backdrop">
          <div className={`modal-ai ${modalActive ? 'active' : ''}`} id="searchAiModal">
            <div className='close-ai'
              onClick={closeAiModal}
            ></div>
            <div id="withOutAifollowUp" style={{ display: followUpChecked ? 'none' : 'block' }}></div>
            <div id="aiFollowUp" style={{ display: followUpChecked ? 'block' : 'none' }}>
              <input
                type="checkbox"
                className="q-follow-up"
                id="qAiFollowUp"
                checked={followUpChecked}
                onChange={() => setFollowUpChecked(!followUpChecked)}
              />
              <label htmlFor="qAiFollowUp">Do you have a follow up question?</label>
            </div>
            <div className="modal-ai-header">
              <input
                type="text"
                style={{ width: '350px' }}
                autoComplete="off"
                className="search-box"
                id="searchAiBox"
                placeholder={followUpChecked ? "Ask Follow Up Question..." : "Type your question here..."}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onInput={fetchSuggestions}
                disabled={isDisabledInput ? true : false}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    askAI();
                  }
                }}
              />
              <button disabled={isDisabledInput ? true : false} className="ask-button" id="askButton" onClick={askAI}>
                Ask AI
              </button>

              <hr />
            </div>
            <div className="chat-container" id="chatContainer">
              {chatMessages.length === 0 ? (
                <div className="centered-container">
                  <p style={{ textAlign: 'center' }}>Type in your question and click on ‘Ask AI.’</p>
                </div>
              ) : (
                chatMessages
              )}
              
            </div>
            <div className="search-results" id="searchAiResults">
              {results}
            </div>
            <div
              id="customAlertBox"
              className="custom-ai-alert-box"
              style={{ display: showAlert ? 'block' : 'none' }}
            >
              <div className="custom-ai-alert-content">
                <span className="custom-alert-closebtn" onClick={() => setShowAlert(false)}>
                  &times;
                </span>
                <p>Please enter some search content</p>
              </div>
            </div>
            <div className="footer">
              <p id="footerText">
                &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; 
                <img src="/cropped-AI12z_favicon-32x32.png" height="20px" alt="favicon" />
                &nbsp;&nbsp; Powered by&nbsp;
                <a href="https://ai12z.com" target="_blank" rel="noopener noreferrer">
                  ai12z Inc.
                </a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span id="projectName">{projectName.replace(/%20/g, ' ')}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Ai12zSearch;