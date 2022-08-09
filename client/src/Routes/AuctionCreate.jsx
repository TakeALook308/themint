import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Container, Title } from '../style/style';
import { categories } from '../utils/constants/constant';
import ActiveInputBox from '../components/common/ActiveInputBox';
import ProductTable from '../components/common/ProductTable';
import Modal from '../components/common/Modal';
import { useDropzone } from 'react-dropzone';
import { auctionApis } from '../utils/api/auctionApi';
import { postData } from '../utils/api/api';
import { useNavigate } from 'react-router-dom';

function AuctionCreate(props) {
  const navigate = useNavigate();
  const [im, setIm] = useState([]);
  const onDrop = (acceptedFiles) => {
    let temp = [...im];
    acceptedFiles.map((item) => temp.push(item));
    setIm(temp);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [inputAuction, setInputAuction] = useState({
    categorySeq: 1,
    auctionImages: [],
    title: '',
    content: '',
    startTime: '',
    products: [],
  });

  const { categorySeq, auctionImages, title, content, startTime, products } = inputAuction;

  const [reservation, setReservation] = useState(false);
  const [productName, setProductName] = useState('');
  const [startPrice, setStartPrice] = useState('');

  const onChange = ({ target: { name, value } }) => {
    if (name === 'startTime') {
      // const time = value.substring(0, 10) + ' ' + value.substring(11) + ':00';
      // const d = new Date(value);
      // console.log(d.toISOString());
      //
      setInputAuction({
        ...inputAuction,
        [name]: value.toISOString(),
      });
    } else {
      setInputAuction({
        ...inputAuction,
        [name]: value,
      });
    }
  };

  const isChecked = (checked) => {
    if (checked) {
      setReservation(true);
    } else {
      setReservation(false);
    }
  };

  const createProducts = (e) => {
    if (productName && startPrice) {
      onChange({ target: { name: 'products', value: [...products, { productName, startPrice }] } });
      setProductName('');
      setStartPrice('');
    }
  };

  const deleteProducts = (index) => {
    onChange({
      target: { name: 'products', value: products.filter((product, i) => index !== i) },
    });
  };

  const [isModal, setIsModal] = useState(false);
  const ModalHandler = () => {
    setIsModal((prev) => !prev);
  };

  return (
    <Container>
      <Title>경매 생성</Title>
      <p>{inputAuction.title}</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          postData(auctionApis.AUCTION_CREATE_API, inputAuction)
            .then(() => {
              console.log(inputAuction);
              alert('성공');
              // navigate(`/main`);
            })
            .catch(() => {
              console.log(inputAuction);
              alert('실패');
              // navigate(`/main`);
            });
        }}>
        <Div>
          <Label>카테고리</Label>
          <Select name="categorySeq" value={categorySeq} onChange={onChange}>
            {categories.map((item, i) => (
              <option key={i} value={item.seq}>
                {item.name}
              </option>
            ))}
          </Select>
        </Div>

        <Div>
          <Label>사진 업로드</Label>
          <FileUpload>
            <div {...getRootProps()}>
              {console.log(im)}
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
          </FileUpload>
        </Div>

        <Div>
          <Label>제목</Label>
          <ActiveInputBox
            placeholder="제목 입력..."
            name="title"
            value={title}
            onChange={onChange}
          />
        </Div>

        <Div>
          <Label>내용</Label>
          <Textarea
            name="content"
            id="content"
            cols="30"
            rows="10"
            placeholder="내용을 입력하세요.."
            onChange={onChange}
            value={content}></Textarea>
        </Div>

        <Div>
          <Label style={{ display: 'inline-block', lineHeight: '24px', verticalAlign: 'middle' }}>
            예약
          </Label>
          <CheckBox
            type="checkbox"
            id="reservation"
            key="yes"
            onChange={(e) => isChecked(e.target.checked)}></CheckBox>
          <label htmlFor="reservation"></label>
          <ActiveInputBox
            name="startTime"
            type="time"
            onChange={onChange}
            disabled={!reservation}
            value={startTime}
          />
        </Div>

        <Div>
          <Label>
            상품 ({products.length})
            <Plus type="button" onClick={ModalHandler}>
              +
            </Plus>
          </Label>

          <ProductTable products={products} />
        </Div>
        <SubmitBox>
          <button type="submit">생성</button>
        </SubmitBox>
      </form>

      <Modal open={isModal} close={ModalHandler} title="상품 관리">
        <Label>상품 ({products.length})</Label>
        <ProductTable products={products} mng={true} deleteProducts={deleteProducts}></ProductTable>
        <Label>이름</Label>
        <ActiveInputBox
          placeholder="이름 입력"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <Label>시작가</Label>
        <ActiveInputBox
          type="number"
          placeholder="시작가 입력"
          value={startPrice}
          onChange={(e) => setStartPrice(e.target.value)}
        />
        <Button onClick={createProducts}>추가</Button>
      </Modal>
    </Container>
  );
}
const Button = styled.button`
  display: block;
  margin: 40px auto 20px;
`;
const Plus = styled.button`
  position: absolute;
  right: 0;
  width: 24px;
  height: 24px;
`;

const CheckBox = styled.input`
  display: none;
  & + label {
    line-height: 64px;
    vertical-align: middle;
    margin-left: 15px;
    border-radius: 3px;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #fff;
  }
  &:checked + label {
    background-color: ${(props) => props.theme.colors.subMint};
    background: url(https://w7.pngwing.com/pngs/516/365/png-transparent-computer-icons-check-mark-desktop-ppt-icon-miscellaneous-angle-hand-thumbnail.png);
    background-size: 20px 20px;
  }
  &:checked ~ input[type='datetime-local'] {
  }
`;

const Select = styled.select`
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 40px;
  color: ${(props) => props.theme.colors.white};
  padding: 10px;
  margin: 0;
  border: none;
  border-radius: 5px;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  background: url('https://user-images.githubusercontent.com/57048162/183007422-e8474fa0-acc1-441e-b7e1-c0701b82b766.png')
    no-repeat;
  background-position: 99%;
  background-size: 15px 12px;
  background-color: ${(props) => props.theme.colors.pointBlack};

  & option {
    display: block;
    padding: 10px;
  }
`;

const SubmitBox = styled.div`
  width: 100%;
  padding: 15px 0;
  display: flex;
  justify-content: center;

  button {
    display: inline-block;
  }
`;

const Div = styled.div`
  padding: 15px 80px;
  position: relative;
`;

const FileUpload = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.pointBlack};
`;
const Textarea = styled.textarea`
  width: 100%;
  background-color: ${(props) => props.theme.colors.pointBlack};
  border: none;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.white};
  padding: 10px;
  resize: none;
  font-family: Pretendard;
  font-size: 14px;
`;
const Label = styled.p`
  font-size: 20px;
  font-weight: 600;
  padding: 20px 0;
  position: relative;
`;

export default AuctionCreate;
