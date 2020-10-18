const priceInput = document.getElementById("price_input");
const producerNameInput = document.getElementById("producer_input");
const woodTypeInput = document.getElementById("wood_type");
const colorInput = document.getElementById("color");
const heightInput = document.getElementById("height_in_centimeters");
const weightInput = document.getElementById("weight_in_kilograms");
const itemsContainer = document.getElementById("items-container");
const submitButton = document.getElementById("submit_button");
  
let doors = [];

const itemTemplate = ({ id, price_in_uah, producer_name, wood_type, color, height_in_centimeters, weight_in_kilograms }) => `<div class="col-md-4">
<div id="item-${id}" class="card mb-4 box-shadow item-card text-center">
  <div class="card-body">
    <img src="img/placeholder-200x200.jpg" />
    <h5 class="card-title"><strong>${price_in_uah} UAH</strong></h5>
    <p class="card-text">Producer: ${producer_name} <br>
    Material: ${wood_type} | Color: ${color}<br>
    Height (cm): ${height_in_centimeters} | Weight (kg): ${weight_in_kilograms}<br></p>
    <p class="card-text" style="text-align: justify;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend cursus
    nibh, dignissim interdum tortor fermentum nec.</p>
    <div class="btn-group">
      <button type="button" class="btn btn-sm btn-outline-dark" onclick=onItemEdit("${id}")>Edit</button>
      <button type="button" class="btn btn-sm btn-outline-danger" onclick=onItemDelete("${id})>Remove</button>
    </div>
  </div>
</div>
</div>`;

export const addItemToPage = ({ id, price_in_uah, producer_name, wood_type, 
    color, height_in_centimeters, weight_in_kilograms }) => {
  itemsContainer.insertAdjacentHTML(
    "afterbegin",
    itemTemplate({ id, price_in_uah, producer_name, wood_type, 
        color, height_in_centimeters, weight_in_kilograms })
  );

  const element = document.getElementById(getItemId(id));

};

export const renderItemsList = (items) => {
  itemsContainer.innerHTML = "";

  for (const item of items) {
    addItemToPage(item);
  }
};

export const getInputValues = () => {
  return {
    price_in_uah: priceInput.value,
    producer_name: producerNameInput.value,
    wood_type: woodTypeInput.value,
    color: colorInput.value,
    height_in_centimeters: heightInput.value,
    weight_in_kilograms: weightInput.value
  };
};
  
const addItem = ({ price_in_uah, producer_name, wood_type, 
  color, height_in_centimeters, weight_in_kilograms }) => {
  const generatedId = id;
  id++;

  const newItem = {
    id: generatedId,
    price_in_uah,
    producer_name,
    wood_type, 
    color,
    height_in_centimeters,
    weight_in_kilograms
  };

  doors.push(newItem);
  localStorage.setItem("DOOR", JSON.stringify(doors));

  addItemToPage(newItem);
};

export const clearInputs = () => {
  titleInput.value = "";

  descriptionInput.value = "";
};

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  const { price_in_uah,
      producer_name,
      wood_type, 
      color,
      height_in_centimeters,
      weight_in_kilograms } = getInputValues();
      
  clearInputs();
  addItem({
      price_in_uah,
      producer_name,
      wood_type, 
      color,
      height_in_centimeters,
      weight_in_kilograms
  });
});

renderItemsList(doors);