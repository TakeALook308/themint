import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Container, Title } from '../../style/style';
import { categories } from '../../utils/constants/constant';
import ActiveInputBox from '../../components/common/ActiveInputBox';
import ProductTable from './ProductTable';
import Modal from '../../components/common/Modal';
import { useDropzone } from 'react-dropzone';
import { auctionApis } from '../../utils/apis/auctionApis';
import { postData } from '../../utils/apis/api';
import { useNavigate } from 'react-router-dom';
import GradientButton from '../../components/ButtonList/GradientButton';
import { AiOutlineDownload, AiFillPlusCircle } from 'react-icons/ai';

function AuctionCreatePage(props) {
  const navigate = useNavigate();
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    acceptedFiles: '.jpeg,.png,.gif',
    maxFilesize: 5,
  });
  const [auctionImageList, setAuctionImageList] = useState([]);
  useEffect(() => {
    let temp = [...auctionImageList];
    acceptedFiles.map((item) => {
      temp.push(item);
    });
    setAuctionImageList(temp);
  }, [acceptedFiles]);

  useEffect(() => {
    handleImageUpload(auctionImageList);
  }, [auctionImageList]);
  // console.log(auctionImageList);

  // const [auctionImageList, setAuctionImageList] = useState([]);
  const d = new Date();
  const [inputAuction, setInputAuction] = useState({
    categorySeq: 1,
    title: '',
    content: '',
    startTime: new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, -1),
    productList: [],
  });

  const { categorySeq, title, content, productList } = inputAuction;
  const startTime =
    inputAuction.startTime.substring(0, 10) + 'T' + inputAuction.startTime.substring(11, 16);
  const [reservation, setReservation] = useState(false);
  const [productName, setProductName] = useState('');
  const [startPrice, setStartPrice] = useState('');

  const onChange = ({ target: { name, value } }) => {
    if (name === 'startTime') {
      const time = value.substring(0, 10) + ' ' + value.substring(11) + ':00';
      setInputAuction({
        ...inputAuction,
        [name]: time,
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
      onChange({
        target: { name: 'productList', value: [...productList, { productName, startPrice }] },
      });
      setProductName('');
      setStartPrice('');
      // scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const deleteProducts = (index) => {
    onChange({
      target: { name: 'productList', value: productList.filter((product, i) => index !== i) },
    });
  };

  const [isModal, setIsModal] = useState(false);
  const ModalHandler = () => {
    setIsModal((prev) => !prev);
  };

  const [imageSrc, setImageSrc] = useState([]);
  const handleImageUpload = (files) => {
    const fileArr = files;
    let fileURLs = [];
    let file;
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length;
    for (let i = 0; i < filesLength; i++) {
      file = fileArr[i];
      let reader = new FileReader();
      reader.onload = () => {
        // console.log(reader.result);
        fileURLs[i] = reader.result;
        setImageSrc([...fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };

  // const scrollRef = useRef();

  return (
    <Container>
      <Title>경매 생성</Title>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData();
          // auctionImageList.map((file) => formData.append('files', file));
          if (auctionImageList) {
            for (let i = 0; i < auctionImageList.length; i++) {
              formData.append('auctionImageList', auctionImageList[i]);
            }
          } else formData.append('auctionImageList', []);
          formData.append(
            'auctionInfo',
            new Blob([JSON.stringify(inputAuction)], { type: 'application/json' }),
          );
          // console.log(formData.get('file'), formData.get('key'));
          postData(auctionApis.AUCTION_CREATE_API, formData, {
            headers: {
              'Content-Type': `multipart/form-data`,
            },
          })
            .then((res) => {
              // console.log(inputAuction);
              alert('성공');
              if (reservation) navigate(`/auctions/${res.data}`);
              else navigate(`/standby/${res.data}`);
            })
            .catch(() => {
              // console.log(inputAuction);
              alert('실패');
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
            {auctionImageList.length === 0 ? ( //사진 없을 때
              <div {...getRootProps()} className="emptyfile">
                <input {...getInputProps()} />

                {isDragActive ? (
                  <div className="nofile">
                    <AiOutlineDownload size={50}></AiOutlineDownload>
                  </div>
                ) : (
                  <div className="nofile">
                    <AiFillPlusCircle size={50}></AiFillPlusCircle>
                  </div>
                )}
              </div>
            ) : (
              //사진 있을 때
              <div className="filelist">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <AiOutlineDownload size={50}></AiOutlineDownload>
                  ) : (
                    <AiFillPlusCircle size={50}></AiFillPlusCircle>
                  )}
                </div>
                {imageSrc.length !== 0
                  ? imageSrc.map((item, i) => (
                      <div key={i}>
                        <img src={item} alt="preview-img" />
                      </div>
                    ))
                  : null}
              </div>
            )}
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
            type="datetime-local"
            onChange={onChange}
            disabled={!reservation}
            value={startTime}
          />
        </Div>

        {/* <Div>
          <Label>
            상품 ({productList.length})
            <Plus type="button" onClick={ModalHandler}>
              +
            </Plus>
          </Label>

          <ProductTable productList={productList} />
        </Div> */}

        <Div>
          <Label>상품 ({productList.length})</Label>

          {/* <TableBox ref={scrollRef}> */}
          <TableBox>
            <Table>
              <colgroup>
                <col width="70%" />
                <col width="30%" />
                <col width="0%" />
              </colgroup>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>시작가</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {productList.map((item, i) => (
                  <tr key={i}>
                    <td>{item.productName}</td>
                    <td>{item.startPrice.toLocaleString()}</td>
                    <td>{<Minus onClick={() => deleteProducts(i)}>-</Minus>}</td>
                  </tr>
                ))}
                <tr>
                  <td>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </td>
                  <td>
                    <input type="hidden" />
                    <input
                      type="number"
                      value={startPrice}
                      onChange={(e) => setStartPrice(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          createProducts();
                        }
                      }}
                    />
                  </td>
                  <td>
                    {
                      <Upload type="button" onClick={createProducts}>
                        +
                      </Upload>
                    }
                  </td>
                </tr>
              </tbody>
            </Table>
          </TableBox>
        </Div>

        <SubmitBox>
          <GradientButton type="submit" text="생성" />
        </SubmitBox>
      </form>

      {/* <Modal open={isModal} close={ModalHandler} title="상품 관리">
        <Label>상품 ({productList.length})</Label>
        <ProductTable
          productList={productList}
          mng={true}
          deleteProducts={deleteProducts}></ProductTable>
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
      </Modal> */}
    </Container>
  );
}
const TableBox = styled.div`
  max-height: 200px;
  overflow: overlay;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb {
    overflow: visible;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(13, 12, 15, 0.4);
  }
`;

const Table = styled.table`
  width: 100%;
  background-color: ${(props) => props.theme.colors.pointBlack};
  border-radius: 5px;

  & tr td,
  tr th {
    padding: 10px;
    text-align: center;
    input {
      outline: none;
      background-color: ${(props) => props.theme.colors.subBlack};
      color: ${(props) => props.theme.colors.white};
      border: 1px solid ${(props) => props.theme.colors.mainBlack};
      height: 25px;
      border-radius: 5px;
      font-size: 16px;
      width: 180px;
      text-align: center;
    }
    input[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
  tr th {
    box-sizing: border-box;
    font-weight: 700;
    background-color: ${(props) => props.theme.colors.pointBlack};
    border-bottom: 1px solid ${(props) => props.theme.colors.mainBlack};
  }
  tr th:nth-child(1),
  tr td:nth-child(1) {
    border-right: 1px dashed ${(props) => props.theme.colors.mainBlack};
  }
`;

const Minus = styled.button`
  background-color: ${(props) => props.theme.colors.pointRed};
  border: none;
  border-radius: 3px;
  font-weight: 700;
  cursor: pointer;
  color: ${(props) => props.theme.colors.white};
`;

const Upload = styled.button`
  background-color: ${(props) => props.theme.colors.subMint};
  border: none;
  border-radius: 3px;
  font-weight: 700;
  cursor: pointer;
  color: ${(props) => props.theme.colors.mainBlack};
`;

const FileUpload = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.pointBlack};
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  /* place-items: center; */
  .emptyfile {
    position: relative;
    width: 100%;
    height: 100%;
    .nofile {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  margin: 0 auto;
  .filelist {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;
    padding: 10px;

    & > div {
      width: 180px;
      height: 120px;
      overflow: hidden;
      background-color: ${(props) => props.theme.colors.pointGray};
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb {
    overflow: visible;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(13, 12, 15, 0.4);
  }
`;

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
  outline: none;
  & option {
    display: block;
    padding: 10px;
  }
`;

const SubmitBox = styled.div`
  width: 120px;
  padding: 15px 0;
  display: flex;
  justify-content: center;
  margin: 0 auto;

  button {
    display: inline-block;
  }
`;

const Div = styled.div`
  padding: 15px 80px;
  position: relative;
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
  outline: none;
`;
const Label = styled.p`
  font-size: 20px;
  font-weight: 600;
  padding: 20px 0;
  position: relative;
`;

export default AuctionCreatePage;
