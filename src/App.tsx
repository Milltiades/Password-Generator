import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled, { createGlobalStyle } from "styled-components";
import { useCopyToClipboard } from "usehooks-ts";
import ArrowRight from "./components/ArrowRight";
import CopySvg from "./components/CopySvg";

function App() {
  const { register, watch } = useForm();

  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [isCheck2, setIsCheck2] = useState<boolean>(false);
  const [isCheck3, setIsCheck3] = useState<boolean>(false);
  const [isCheck4, setIsCheck4] = useState<boolean>(false);

  const [strengthColor, setStrengthColor] = useState<number>(0);

  const [password, setPassword] = useState<any>("");
  const [passwordLength, setPasswordLength] = useState(0);
  const [upperCase, setUpperCase] = useState<boolean>(false);
  const [lowerCase, setLowerCase] = useState<boolean>(false);
  const [isNumber, setIsNumber] = useState<boolean>(false);
  const [isSymbol, setIsSymbol] = useState<boolean>(false);

  const UpperList = "QWERTYUIOPASDFGHJKLZXCVBNM";
  const LowerList = "qwertyuiopasdfghjklzxcvbnm";
  const NumberList = "1234567890";
  const SymbolList = "!@#$%^&*()_+<>?-=";

  const [value, copy] = useCopyToClipboard();

  const copyFunc = () => {
    copy(password);
  };

  const generatePassword = () => {
    let allTogether = "";

    if (upperCase) {
      allTogether += UpperList;
    }
    if (lowerCase) {
      allTogether += LowerList;
    }
    if (isNumber) {
      allTogether += NumberList;
    }
    if (isSymbol) {
      allTogether += SymbolList;
    }

    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * allTogether.length);
      newPassword += allTogether.charAt(randomIndex);
    }

    setPassword(newPassword);

    if (upperCase && lowerCase && isNumber && isSymbol) {
      console.log("Strong");
      setStrengthColor(4);
    } else if (upperCase && lowerCase && isNumber) {
      console.log("Medium");
      setStrengthColor(3);
    } else if (upperCase && lowerCase && isSymbol) {
      console.log("Medium");
      setStrengthColor(3);
    } else if (isNumber && isSymbol && lowerCase) {
      console.log("Medium");
      setStrengthColor(3);
    } else if (isNumber && isSymbol && upperCase) {
      console.log("Medium");
      setStrengthColor(3);
    } else if (lowerCase && isNumber) {
      console.log("Weak");
      setStrengthColor(2);
    } else if (upperCase && lowerCase) {
      console.log("Weak");
      setStrengthColor(2);
    } else if (isSymbol && lowerCase) {
      console.log("Weak");
      setStrengthColor(2);
    } else if (isSymbol && isNumber) {
      console.log("Weak");
      setStrengthColor(2);
    } else if (isSymbol && upperCase) {
      console.log("Weak");
      setStrengthColor(2);
    } else if (isNumber && upperCase) {
      console.log("Weak");
      setStrengthColor(2);
    } else if (upperCase || lowerCase || isNumber || isSymbol) {
      console.log("Too Weak");
      setStrengthColor(1);
    }
  };

  return (
    <ContentDiv>
      <GlobalStyles />

      <H3Div>
        <H3DivH3>Password Generator</H3DivH3>
      </H3Div>
      <Header>
        <HeaderH1>{password}</HeaderH1>
        <HeaderDivFor>
          <HeaderCopyP>{password === value ? "COPIED" : null}</HeaderCopyP>
          <HeaderButton className="btnSvg" onClick={copyFunc}>
            <svg
              className="SvgCopy"
              width="21"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z"
                fill="#A4FFAF"
              />
            </svg>
          </HeaderButton>
        </HeaderDivFor>
      </Header>
      <Main>
        <MainHeader>
          <MainHeaderP1>Character Length</MainHeaderP1>
          <MainHeaderP2>{watch("range")}</MainHeaderP2>
        </MainHeader>
        <InputRange
          type="range"
          min={6}
          max={20}
          {...register("range")}
          value={passwordLength}
          onInput={(e) => setPasswordLength(watch("range"))}
        />

        <CheckboxDiv>
          <CheckBox
            onClick={() => {
              setIsCheck(!isCheck);
              setUpperCase(!upperCase);
            }}
            color={isCheck ? "#A4FFAF" : "transparent"}
            border={isCheck ? "none" : "2px solid white"}
          >
            {isCheck ? <img src="/assets/icon-check.svg" alt="" /> : null}
          </CheckBox>
          <CHeckboxP>Include Uppercase Letters</CHeckboxP>
        </CheckboxDiv>
        <CheckboxDiv>
          <CheckBox
            onClick={() => {
              setLowerCase(!lowerCase);
              setIsCheck2(!isCheck2);
            }}
            color={isCheck2 ? "#A4FFAF" : "transparent"}
            border={isCheck2 ? "none" : "2px solid white"}
          >
            {isCheck2 ? <img src="/assets/icon-check.svg" alt="" /> : null}
          </CheckBox>
          <CHeckboxP>Include Lowercase Letters</CHeckboxP>
        </CheckboxDiv>
        <CheckboxDiv>
          <CheckBox
            onClick={() => {
              setIsNumber(!isNumber);
              setIsCheck3(!isCheck3);
            }}
            color={isCheck3 ? "#A4FFAF" : "transparent"}
            border={isCheck3 ? "none" : "2px solid white"}
          >
            {isCheck3 ? <img src="/assets/icon-check.svg" alt="" /> : null}
          </CheckBox>
          <CHeckboxP>Include Numbers</CHeckboxP>
        </CheckboxDiv>
        <CheckboxDiv>
          <CheckBox
            onClick={() => {
              setIsSymbol(!isSymbol);
              setIsCheck4(!isCheck4);
            }}
            color={isCheck4 ? "#A4FFAF" : "transparent"}
            border={isCheck4 ? "none" : "2px solid white"}
          >
            {isCheck4 ? <img src="/assets/icon-check.svg" alt="" /> : null}
          </CheckBox>
          <CHeckboxP>Include Symbols</CHeckboxP>
        </CheckboxDiv>

        <StrengthDiv>
          <StrengthDivP>STRENGTH</StrengthDivP>
          <StrengthDivRight>
            <StrengthDivRightP>
              {strengthColor == 4
                ? "STRONG"
                : strengthColor == 3
                ? "MEDIUM"
                : strengthColor == 2
                ? "WEEK"
                : strengthColor == 1
                ? "TOO WEEK"
                : null}
            </StrengthDivRightP>
            <ColoredDiv
              border={
                strengthColor == 4 ||
                strengthColor == 3 ||
                strengthColor == 2 ||
                strengthColor == 1
                  ? "none"
                  : "2px solid white"
              }
              color={
                strengthColor == 4
                  ? "#A4FFAF"
                  : strengthColor == 3
                  ? "#F8CD65"
                  : strengthColor == 2
                  ? "#FB7C58"
                  : strengthColor == 1
                  ? "#F64A4A"
                  : "transparent"
              }
            />
            <ColoredDiv
              border={
                strengthColor == 4 || strengthColor == 3 || strengthColor == 2
                  ? "none"
                  : "2px solid white"
              }
              color={
                strengthColor == 4
                  ? "#A4FFAF"
                  : strengthColor == 3
                  ? "#F8CD65"
                  : strengthColor == 2
                  ? "#FB7C58"
                  : "transparent"
              }
            />
            <ColoredDiv
              border={
                strengthColor == 4 || strengthColor == 3
                  ? "none"
                  : "2px solid white"
              }
              color={
                strengthColor == 4
                  ? "#A4FFAF"
                  : strengthColor == 3
                  ? "#F8CD65"
                  : "transparent"
              }
            />
            <ColoredDiv
              border={strengthColor == 4 ? "none" : "2px solid white"}
              color={strengthColor == 4 ? "#A4FFAF" : "transparent"}
            />
          </StrengthDivRight>
        </StrengthDiv>
        <GenerateButton className="btnGenerate" onClick={generatePassword}>
          <GenerateButtonP className="BtnP">GENERATE</GenerateButtonP>
          <svg
            className="ArrowRightIcon"
            width="12"
            height="12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#24232C"
              d="m5.106 12 6-6-6-6-1.265 1.265 3.841 3.84H.001v1.79h7.681l-3.841 3.84z"
            />
          </svg>
        </GenerateButton>
      </Main>
    </ContentDiv>
  );
}

export default App;

const HeaderDivFor = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderCopyP = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
  color: #a4ffaf;
  margin-right: 16px;
  @media (width > 767px) {
    font-size: 18px;
    line-height: 24px;
  }
`;
const H3Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;

  @media (width > 767px) {
    margin-bottom: 31px;
  }
`;
const H3DivH3 = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  color: #817d92;

  @media (width > 767px) {
    font-size: 24px;
    line-height: 32px;
  }
`;
const ContentDiv = styled.div`
  width: 100%;
  padding: 64px 16px 63px 16px;
`;

const Header = styled.div`
  padding: 17px 16px 15px 16px;
  background-color: #24232c;
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 64px;
  @media (width > 767px) {
    padding: 19px 32px;
    height: 80px;
  }
`;
const HeaderH1 = styled.h1`
  font-family: "JetBrains Mono";
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #e6e5ea;
  @media (width > 767px) {
    font-size: 32px;
    line-height: 42px;
  }
`;
const HeaderButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  &:hover .SvgCopy path {
    fill: white;
  }
`;
const HeaderButtonImg = styled.img`
  width: 17.5px;
  height: 20px;
  @media (width > 767px) {
    width: 21px;
    height: 24px;
  }
`;

const Main = styled.div`
  margin-top: 16px;
  background-color: #24232c;
  padding: 21px 16px 16px 16px;
  width: 100%;
  @media (width > 767px) {
    margin-top: 24px;
    padding: 24px 32px 32px 32px;
  }
`;
const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 42px;
`;
const MainHeaderP1 = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
  color: #e6e5ea;

  @media (width > 767px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

const MainHeaderP2 = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #a4ffaf;

  @media (width > 767px) {
    font-size: 32px;
    line-height: 42px;
  }
`;
const InputRange = styled.input`
  width: 100%;
  margin-top: 25px;
  margin-bottom: 32px;
  cursor: pointer;
  height: 8px;

  -webkit-appearance: none;
  background: #18171f;

  outline: none;
  overflow: visible;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #e6e5ea;
    /* box-shadow: -400px 0 0 400px #a4ffaf; */
  }
`;

const CheckboxDiv = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 19px;
  @media (width > 767px) {
    margin-bottom: 23px;
  }
`;
const CHeckboxP = styled.p`
  margin-left: 20px;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
  color: #e6e5ea;
  @media (width > 767px) {
    font-size: 18px;
    line-height: 24px;
    margin-left: 24px;
  }
`;
const CheckBox = styled.button<any>`
  background: ${(props) => props.color};
  width: 20px;
  height: 20px;
  border: ${(props) => props.border};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StrengthDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: #18171f;
  margin-top: 31px;
  margin-bottom: 16px;
  height: 56px;
  @media (width > 767px) {
    height: 72px;
    padding: 23px 31.5px 21px 32px;
    margin-bottom: 32px;
  }
`;
const StrengthDivP = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  color: #817d92;
  @media (width > 767px) {
    font-size: 18px;
    line-height: 24px;
  }
`;
const StrengthDivRight = styled.div`
  display: flex;
  align-items: center;
`;
const StrengthDivRightP = styled.p`
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  text-align: right;
  color: #e6e5ea;
  margin-right: 8px;
  @media (width > 767px) {
    font-size: 24px;
    line-height: 32px;
  }
`;
const ColoredDiv = styled.div<any>`
  width: 10px;
  height: 24px;
  border: ${(props) => props.border};
  margin-left: 8px;
  background: ${(props) => props.color};
`;

const GenerateButton = styled.button`
  width: 100%;
  background: #a4ffaf;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 21px;
  padding-bottom: 20px;
  height: 56px;
  cursor: pointer;
  border: 2px solid #a4ffaf;
  &:hover {
    background: transparent;
  }
  &:hover .BtnP {
    color: #a4ffaf;
  }
  &:hover .ArrowRightIcon path {
    fill: #a4ffaf;
  }

  @media (width > 767px) {
    height: 65px;
  }
`;
const GenerateButtonP = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: #24232c;
  margin-right: 16px;
  @media (width > 767px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

const GlobalStyles = createGlobalStyle`
  

*{
  box-sizing: border-box;
  overflow: hidden;
  margin: 0;
  padding: 0;
  font-family: 'JetBrains Mono', monospace;
}



body {
  min-width: 320px;
  min-height: 100vh;
  background: #18171F;
  @media (width > 767px){
    padding: 133px 114px 196px 114px;
  }
  @media (width > 1439px) {
    padding: 133px 31.25% 196px 31.25%;
  }
}

.SvgCopy{
  transform: scale(0.83333);
  @media (width > 767px){
    transform: scale(1);
  }
}














`;
