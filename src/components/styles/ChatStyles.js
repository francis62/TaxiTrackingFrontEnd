const containerStyle = {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Arial, sans-serif',
  color: 'green'
};

const chatContainer = {
  backgroundImage: 'url(/assets/chatBackground.png)', 
  backgroundSize: 'cover', 
  backgroundPosition: 'center'   
}

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: '#007BFF',
  color: 'white',
  fontSize: '18px',
  fontWeight: 'bold'
};

const iconStyle = {
  marginRight: '8px',
  fontSize: '2rem'
};

const titleStyle = {
  textTransform: 'uppercase'
};

const messagesContainerStyle = {
  flex: 1,
  overflow: 'auto',
  padding: '10px',
  backgroundColor: '#f1f1f1'
};

const messageStyle = {
  backgroundColor: 'white',
  padding: '10px',
  borderRadius: '5px',
  marginBottom: '10px',
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
};

const inputContainerStyle = {
  display: 'flex',
  padding: '1rem 2rem',
  backgroundColor: '#007BFF',
  alignItems: 'center'
};

const inputStyle = {
  flex: 1,
  padding: '1rem',
  borderRadius: '1rem',
  border: '1px solid #ddd',
  fontSize: '14px'
};

const buttonStyle = {
  padding: '0.5rem 0.5rem',
  marginLeft: '2rem',
  backgroundColor: 'green',
  border: 'none',
  borderRadius: '1rem',
  color: 'white',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};


const chatConductorContainerStyle = {
  display: 'flex',
  height: '100vh',
  backgroundColor: '#f0f0f0',
};

const chatConductorNamesStyle = {
  width: '30%',
  borderRight: '1px solid #ccc',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
};

const chatConductorNamesHeaderStyle = {
  margin: 0,
  padding: '1rem',
  backgroundColor: '#075e54',
  color: '#fff',
  textAlign: 'center',
};

const chatConductorNamesListStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const chatConductorNameItemStyle = {
  cursor: 'pointer',
  padding: '1rem',
  borderBottom: '1px solid #ddd',
  transition: 'background-color 0.3s',
};

const chatConductorNameItemHoverStyle = {
  backgroundColor: '#e0e0e0',
};

const chatConductorMessagesStyle = {
  width: '70%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#ece5dd',
};

const chatConductorMessagesHeaderStyle = {
  backgroundColor: '#075e54',
  color: '#fff',
  padding: '1rem',
  textAlign: 'center',
};

const chatConductorMessagesContentStyle = {
  flex: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '60px',
};

const chatConductorMessageItemStyle = {
  padding: '10px',
  margin: '5px 0',
  borderRadius: '20px',
  maxWidth: '60%',
};

const chatConductorMessageItemLeftStyle = {
  alignSelf: 'flex-start',
  backgroundColor: '#dcf8c6',
};

const chatConductorMessageItemRightStyle = {
  alignSelf: 'flex-end',
  backgroundColor: '#fff',
};

const chatConductorInputContainerStyle = {
  position: 'fixed',
  bottom: 0,
  width: '70%',
  display: 'flex',
  flexDirection: 'row',
  padding: '10px',
  backgroundColor: '#fff',
  borderTop: '1px solid #ccc',
};

const chatConductorInputFieldStyle = {
  flex: 1,
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '20px',
  outline: 'none',
};

const chatConductorSendButtonStyle = {
  backgroundColor: '#075e54',
  border: 'none',
  padding: '10px',
  marginLeft: '10px',
  borderRadius: '50%',
  color: '#fff',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const chatConductorSendIconStyle = {
  fontSize: '24px',
};

export {
  chatContainer,
  containerStyle,
  headerStyle,
  iconStyle,
  titleStyle,
  messagesContainerStyle,
  messageStyle,
  inputContainerStyle,
  inputStyle,
  buttonStyle,
  chatConductorContainerStyle,
  chatConductorNamesStyle,
  chatConductorNamesHeaderStyle,
  chatConductorNamesListStyle,
  chatConductorNameItemStyle,
  chatConductorNameItemHoverStyle,
  chatConductorMessagesStyle,
  chatConductorMessagesHeaderStyle,
  chatConductorMessagesContentStyle,
  chatConductorMessageItemStyle,
  chatConductorMessageItemLeftStyle,
  chatConductorMessageItemRightStyle,
  chatConductorInputContainerStyle,
  chatConductorInputFieldStyle,
  chatConductorSendButtonStyle,
  chatConductorSendIconStyle
};