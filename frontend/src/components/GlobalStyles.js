import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *{
        box-sizing: border-box;
        margin: 0 auto; 
    }

    body {
        margin: 0;
        font-family: 'Karla', sans-serif;
        background-color: #BBDEF0;
    }

    h1 {
        color: #00A6A6;
        font-family: 'Sniglet', cursive;
        text-shadow: 2px 2px #005353;
        letter-spacing: 3px;
        margin-top: 30px;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
    }

    h2 {
        color: #00A6A6;
        font-family: 'Sniglet', cursive;
        font-size: 35px;
        text-shadow: 1.5px 1.5px #005353;
        letter-spacing: 2px;
        word-spacing: 4px;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        margin: 27px 14px 20px 14px;
        padding: 20px 15px 20px 15px;
    }

    h3 {
        color: #005353;
        text-shadow: 1px 1px #005353;
        letter-spacing: 1.7px;
        word-spacing: 3px;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        margin-top: 25px;
        margin-bottom: 25px;
        font-size: 25px;
        line-height: 1.5;
    }

    header {
        background-color: #00A6A6;
        border-bottom: 3px solid #005353;
        height: 90px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 40px 20px 20px;
    }

    section {
        color: #005353;
        background-color: #F9F7B8;
        display: flex;
        font-size: 18px;
        font-weight: bold;
        flex-wrap: wrap;
        border: 2px solid #00A6A6;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px 0px #ccc;
        margin: 15px 35px 15px 25px;
        min-height: 150px;
        align-content: center;
        align-items: center;
        justify-content: center;
        height: 100px;
        min-height: 100px;
        line-height: 1.7;
    }

    @media (min-width: 668px) and (max-width: 1023px) {
      section {
            margin-right: 100px;
            margin-left: 100px;
        }
    }

    @media (min-width: 1024px) {
      section {
            margin-right: 200px;
            margin-left: 200px;
        }
    }
`;

export const LoginHeader = styled.header.attrs({ className: "login-header" })`
  background-color: #005353;
  border-bottom: 3px solid #00A6A6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px 20px 20px;
  position: relative;

  h1 {
    color: #00A6A6;
    font-family: 'Sniglet', cursive;
    text-shadow: 2px 2px #F9F7B8;
    letter-spacing: 3px;
    margin-top: 30px;
    font-size: 3.5em;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    margin-top: 0px;
  }
`;

export const LoginH2 = styled.h2.attrs({ className: "login-h2" })`
  flex: wrap;
  font-size: 2em;
  padding: 20px 0px 10px 0px;
  margin: 5px 10px 20px 5px;

  @media (min-width: 668px) {
    font-size: 45px;
  }
`;

export const MainH2 = styled.h2.attrs({ className: "main-h2" })`
  flex: wrap;
  font-size: 35px;
  padding: 20px 0px 10px 0px;
  margin: 5px 10px 20px 5px;

  @media (min-width: 668px) {
    font-size: 50px;
  }
`;

export const Button = styled.button`
    background-color: #BBDEF0;
    color: #005353;
    border: 2px solid #F9F7B8;
    padding: 10px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px bold;
    margin: 30px 2px 20px 30px;
    cursor: pointer;
    transition: all 0.5s ease; // adds a transition effect for hover state
    text-transform: uppercase;
    border-radius: 10px;
    box-shadow: rgb(255, 217, 19, 0.5) 0px 0px 0px 6px;
    
    &:hover {
        box-shadow: rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19, 0.7) 0px 0px 0px 9px, rgb(255, 156, 85, 0.6) 0px 0px 0px 12px;
        transform: translateY(-4px); // lift the button up slightly on hover */
        border-radius: 10px;
  }
`;

export const RadioButton = styled.input`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid #005353;
    margin-bottom: 15px;

    &:checked {
    background-color: rgb(31, 193, 27);
    }

    &:active {
    background-color: #005353;
    }
`;

export const RadioLabel = styled.label`
  font-size: 22px;
  color: #005353;
  cursor: pointer;
  margin-bottom: 10px;
`;

export const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Img = styled.img`
    width: 60px;
    height: 60px;
    margin-left: 1px;
`;

export const Input = styled.input`
  color: #005353;
  background-color: #F9F7B8;
  padding: 12px 20px;
  border: 2.3px solid #005353;
  border-radius: 4px;
  font-size: 16px;
  box-shadow: 0px 0px 4px rgba(0, 83, 83, 0.1);
  transition: all 0.2s ease-in-out;
  max-width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;

  &:focus {
    border-color: rgba(248, 233, 71);
    outline: none;
    box-shadow: 0px 0px 10px rgba(248, 233, 71, 0.7);
  }
`;

export const MainInput = styled.input.attrs({ className: "main-input" })`
  color: #005353;
  background-color: #f1f1f1;
  padding: 12px 20px;
  border: 2.3px solid #005353;
  border-radius: 4px;
  font-size: 16px;
  box-shadow: 0px 0px 4px rgba(0, 83, 83, 0.1);
  transition: all 0.2s ease-in-out;
  max-width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: 25px;

  &:focus {
    border-color: rgba(248, 233, 71);
    outline: none;
    box-shadow: 0px 0px 10px rgba(248, 233, 71, 0.7);
  }

  @media (min-width: 668px) and (max-width: 1023px) {
      margin-right: 20px;
      margin-left: 100px;
  }

  @media (min-width: 1024px) {
      margin-right: 20px;
      margin-left: 200px;
  }
`

export const Label = styled.label`
  font-size: 18px;
  font-weight: bold;
  color: #005353;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
  display: inline;
`;

export const Form = styled.form`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
  padding-top: 40px;
  background-color: #f1f1f1;
  border-radius: 4px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
`;