import React, { useEffect, useState } from 'react'
import { Link, NavLink, } from 'react-router-dom'
import { Form, Label } from 'reactstrap'
import "../Pages/Order.css"
import axios from 'axios'
import { useHistory } from "react-router-dom";

const Order = () => {

  const [pizza, setPizza] = useState({
    name: "Position Absolute Acı Pizza",
    description: "güzeldir",
  });

  const [form, setForm] = useState({
    size: " ",
    thickness: " ",
    supp: [],
    note: " ",
    piece: " ",
    price: " "
  });



  const [succ, setSucc] = useState();
  const [cost, setCost] = useState();
  const [thickness, setThickness] = useState("Hamur Kalınlığı");
  const [supp, setSupp] = useState([]);
  const supps = ["Pepperoni", "Domates", "Biber", "Sosis", "Kanada Jambonu", "Acı Sucuk", "Mısır", "Sucuk", "Ananas", "Tavuk Izgara", "Jalepeno", "Kabak", "Soğan", "Sarımsak"];
  const [piece, setPiece] = useState(1)


  const handleChange = (e) => {
    const {type, value, name} = e.target
    setForm({ ...form, [e.target.name]: e.target.value })
    if (type === "checkbox"){
      setForm({ ...form, })
    }
  };

  useEffect(() => {
    if (form.size === "small") {
      setCost(30);
      setForm({ ...form, price: cost })
    } else if (form.size === "medium") {
      setCost(50);
      setForm({ ...form, price: cost })
    } else if (form.size === "large") {
      setCost(80)
      setForm({ ...form, price: cost })
    }
  }, [form.size]);

  const suppHandle = (e) => {
    supp.includes(e) ? setSupp(supp.filter((item) => e !== item)) : setSupp([...supp, e])
    setForm({ ...form, supp: supp })
  }

  useEffect(() => {
   

  }, [form])

  useEffect(() => {
 

  }, [piece])

  console.log(form)

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/orders", form)
      .then((response) => {
        console.log(response);
        setSucc(response.data);
        setTimeout(() => {
          history.push("/success");
        }, 0);
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const suppHandleCheck = (e) => {
    let updatedList = [...supp];
    updatedList = [...supp, e.target.value];
    if (e.target.value == supp.indexOf(e.target.value)) {
      updatedList.splice(supp.indexOf(e.target.value), 1);
    }
    setForm({ ...form, supp })
  };


  const increasePiece = () => {
    setPiece(piece + 1);
    setForm({ ...form, piece: piece })
  }

  const decreasePiece = () => {
    if (piece > 1) {
      setPiece(piece - 1);
      setForm({ ...form, piece: piece })
    } else {
      setPiece(piece)
      setForm({ ...form, piece: piece })
    }

  }


  return (
    <div>
      <div className='form-top-container'>
        <div className='form-container'>
          <div className='form-links'>
            <NavLink
              className="link-dec"
              to="/"
            >Ana Sayfa</NavLink>
            <span className='link-dec'> - </span>
            <NavLink className="link-dec" to="/">Seçenekler</NavLink>
            <span className='link-dec'> - </span>
            <NavLink
              className="link-dec"
              to="/order"
              style={isActive => ({
                fontWeight: isActive ? "bold" : "normal"
              })}>Sipariş Oluştur</NavLink>
          </div>
        </div>
      </div>
      <div className='order'>
        <div onSubmit={handleSubmit} className='pizza'>
          <div className='pizza-name'>
            Position Absolute Acı Pizza
          </div>
          <div className='product-spec'>
            <div className='price'>
              50
            </div>
            <div className='rate'>
              4.9
            </div>
            <div className='times'>
              (200)
            </div>
          </div>
          <div className='product-details'>
            Frontend Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir..Küçük bir pizzaya bazen pizzetta denir.
          </div>
          <div className='pizza-selection'>
            <div className='select-size'>
              <h3>Boyut seç <span style={{ color: "red" }}>*</span></h3>
              <Form className='size-radio'>
                <input
                  type="radio"
                  name="size"
                  id='id-small'
                  value={"small"}
                  onChange={handleChange} />
                <label className='size-text' htmlFor="id-small">Küçük</label><br />

                <input
                  type="radio"
                  name="size"
                  id='id-medium'
                  value={"medium"}
                  onChange={handleChange} />
                <label className='size-text' htmlFor="id-medium">Orta</label><br />

                <input
                  type="radio"
                  name="size"
                  id='id-large'
                  value={"large"}
                  onChange={handleChange} />
                <label className='size-text' htmlFor="id-large">Büyük</label><br />
              </Form>

            </div>
            <div className='select-thickness'>
              <h3>Hamur Seç <span style={{ color: "red" }}>*</span></h3>

              <Form>
                <select
                  id="product-thickness"
                  placeholder='Hamur Kalınlığı'
                  name="thickness"
                  type="select"
                  onChange={handleChange}
                  value={form.thickness}>
                  <option value='thin'>İnce</option>
                  <option value='thick'>Kalın</option>
                </select>
              </Form>
            </div>
          </div>
          <div className='product-supp-details'>
            <div>
              <h2>Ek Malzemeler</h2>
            </div>
            <div className='product-add'>
              En fazla 10 malzeme seçebilirsiniz. 5 tl.
            </div>
            <div className='product-supps'>
              {supps.map((item, index) => (
                <div className='supps' key={index}>
                  <input value={item} type="checkbox" name='supp' onChange={handleChange}/>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='product-notes'>
            <div>
              <h2>Sipariş Notları</h2>
            </div>
            <div>
              <textarea id="product-note" name="note" type="text" rows='4' cols='50'
                onChange={handleChange}
                placeholder="Siparişinize eklemek istediğin bir not var mı?" />
            </div>
          </div>
          <hr />
          <div className='product-order-end'>
            <div className='piece-buttons'>
              <div className='total-button'><button className='left-button' onClick={decreasePiece}>-</button>
                {piece}
                <button className='right-button' onClick={increasePiece}>+</button></div>
            </div>
            <div className='order-cost-total-cost'>
              <div className='order-cost-text'>
                <div>
                  <h2>Siparişlerin Toplamı</h2>
                </div>
                <div className='supp-cost'>
                  <div>
                    Seçim:
                  </div>
                  <div>
                    {form.piece}
                  </div>
                </div>
                <div className='total-cost'>
                  <div>
                    Toplam:
                  </div>
                  <div>
                    {form.price}
                  </div>
                </div>
                <div>
                  <button>Sipariş Ver</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Order