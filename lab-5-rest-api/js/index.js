var app = new function() {

  this.el = document.getElementById('doors');
  this.url = 'http://localhost:8090/door';

  this.doors = [];
  this.filteredByProducer = [];
  this.sortedByPrice = [];

  this.sortTriggered = false;
  this.searchTriggered = false;


  //                                          //
  //                 COUNTERS                 //
  //                                          //


  // COUNT ALL ITEMS

  this.Count = function(data) {
    var el   = document.getElementById('counter');
    var name = 'doors';

    if (data) {
      if (data == 1) {
        name = 'door';
      }
      el.innerHTML = data + ' ' + name;

      document.getElementById('clear-spoiler').style.display = 'block';
      document.getElementById('search-by-producer').style.display = 'block';
    } else {
      el.innerHTML = 'No ' + name;

      document.getElementById('clear-spoiler').style.display = 'none';
    }
  };

  //////////////////////////////////////////////

  // COUNT TOTAL PRICE OF ALL ITEMS

  this.CountPrice = function(array) {
    var el   = document.getElementById('total-price-counter');
    var totalPrice = 0;
    if (array.length > 0) {
      for (i = 0; i < array.length; i++) {
        totalPrice += Number(array[i].price);
      }
    }
    el.innerHTML = 'Total price: ' + totalPrice;
  };

  //////////////////////////////////////////////

  // COUNT TOTAL AMOUNT OF ITEMS PRODUCED BY UKRAINE

  this.CountUkrainianProducts = function(array) {
    var el   = document.getElementById('ukrainian-products-counter');
    var counter = 0;
    if (array.length > 0) {
      for (i = 0; i < array.length; i++) {
        if (array[i].producer === 'Ukraine') {
          counter++;
        }
      }
    }
    el.innerHTML = 'Total amount of Ukrainian products: ' + counter;
  };

  //////////////////////////////////////////////

  //                                          //
  //                   CRUD                   //
  //                                          //


  // READ ALL ITEMS

  this.FetchAll = async function() {
    var data = '';
    var array = [];
    
    if (this.searchTriggered) {

      if (window.localStorage.getItem("FILTERED")) {
        this.filteredByProducer = JSON.parse(window.localStorage.getItem("FILTERED"));
      }
      array = this.filteredByProducer;

    } else if (this.sortTriggered) {

      if (window.localStorage.getItem("SORTED")) {
        this.sortedByPrice = JSON.parse(window.localStorage.getItem("SORTED"));
      }
      array = this.sortedByPrice;
    
    } else {

      const res = await fetch(this.url);
      const res_data = await res.json();
      console.log(res_data);
      this.doors = res_data;

      array = this.doors;
    }

    if (array.length > 0) {
      for (i = 0; i < array.length; i++) {
        data += `<div class="col-md-4">
        <div id="${array[i].id}" class="card mb-4 box-shadow item-card text-center">
          <div class="card-body" style="margin: auto;">
            <img src="img/placeholder-200x200.jpg" />
            <h5 class="card-title"><strong>${array[i].price} UAH</strong></h5>
            <p class="card-text">Producer: ${array[i].producer}<br>
              Material: ${array[i].wood_type} | Color: ${array[i].color}<br>
              Height (cm): ${array[i].height} | Weight (kg): ${array[i].weight}<br></p>
              <p class="card-text" style="text-align: justify;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend cursus
              nibh, dignissim interdum tortor fermentum nec.</p>
            <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-dark" onclick="app.Edit(${array[i].id})">Edit</button>
              <button type="button" class="btn btn-sm btn-outline-danger" onclick="app.Delete(${array[i].id})">Remove</button>
            </div>
          </div>
        </div>
        </div>`;
      }
    }

    this.Count(array.length);
    this.CountPrice(array);
    this.CountUkrainianProducts(array);

    this.filteredByProducer = [];
    this.sortedByPrice = [];
    window.localStorage.removeItem("FILTERED");
    window.localStorage.removeItem("SORTED");

    return this.el.innerHTML = data;
  };

  //////////////////////////////////////////////

  // CREATE ITEM
  

  this.Add = async function () {
    price = Number(document.getElementById('add-price').value);
    producer = document.getElementById('add-producer').value;
    woodType = document.getElementById('add-woodtype').value;
    color = document.getElementById('add-color').value;
    height = Number(document.getElementById('add-height').value);
    weight = Number(document.getElementById('add-weight').value);

    var new_object = {
      price: price,
      producer: producer,
      wood_type: woodType,
      color: color,
      height: height,
      weight: weight
    };

    const res = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(new_object)
    })
    .then(() => {
      window.location.href = "./index.html";
    })
    .catch((error) => console.log(error));

    price = '';
    producer = '';
    woodType = '';
    color = '';
    height = '';
    weight = '';

    this.FetchAll();
  };

  //////////////////////////////////////////////

  // UPDATE ITEM

  this.Edit = async function (item) {
    price = document.getElementById('edit-price');
    producer = document.getElementById('edit-producer');
    wood_type = document.getElementById('edit-woodtype');
    color = document.getElementById('edit-color');
    height = document.getElementById('edit-height');
    weight = document.getElementById('edit-weight');

    var current = null;

    for (i = 0; i < this.doors.length; i++) {
      if (this.doors[i].id == item) {
        current = this.doors[i];
      }
    }

    price.value = Number(current.price);
    producer.value = current.producer;
    wood_type.value = current.wood_type;
    color.value = current.color;
    height.value = Number(current.height);
    weight.value = Number(current.weight);

    document.getElementById('edit-spoiler').style.display = 'block';
    self = this;

    document.getElementById('edit-save').onsubmit = async function() {

        price = Number(document.getElementById('edit-price').value);
        producer = document.getElementById('edit-producer').value;
        wood_type = document.getElementById('edit-woodtype').value;
        color = document.getElementById('edit-color').value;
        height = Number(document.getElementById('edit-height').value);
        weight = Number(document.getElementById('edit-weight').value);

        var updatedObject = {
          price: price,
          producer: producer,
          wood_type: wood_type,
          color: color,
          height: height,
          weight: weight
        };

        await fetch(this.url + '/' + item, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(updatedObject),
        })
          .catch((error) => console.log(error));

        self.FetchAll();
        self.CloseInput();
    }
  };

  //////////////////////////////////////////////

  // DELETE ITEM

  this.Delete = async function (item) {
    await fetch(this.url + '/' + item, {
      method: 'DELETE',
    })
      .catch((error) => console.log(error));
    this.FetchAll();
  };

  //////////////////////////////////////////////

  //                                          //
  //                   UTIL                   //
  //                                          //


  // SEARCH (FILTER) BY PRODUCER

  this.SearchByProducer = function() {
    console.log('search triggered');
    producer = document.getElementById('search-producer').value;
    this.searchTriggered = false;

    if (producer) {
      for (i = 0; i < this.doors.length; i++) {
        if (this.doors[i].producer.toUpperCase() === producer.toUpperCase()) {
          this.filteredByProducer.push(this.doors[i]);
          console.log('added', this.doors[i]);
          window.localStorage.setItem("FILTERED", JSON.stringify(this.filteredByProducer));
        }
      }
      producer = '';

    this.searchTriggered = true;
    }
    this.FetchAll();
    this.searchTriggered = false;
  };

  //////////////////////////////////////////////

  // SORT (BUBBLE) BY PRICE

  this.BubbleSortByPrice = function() {
    this.sortedByPrice = this.doors;

    for (i = 0; i < this.sortedByPrice.length; i++) {
      swapped = false;
      for (current_pos = 0; current_pos < this.sortedByPrice.length - i - 1; current_pos++) {
        if(this.sortedByPrice[current_pos].price > this.sortedByPrice[current_pos+1].price) {
          temp = this.sortedByPrice[current_pos];
          this.sortedByPrice[current_pos] = this.sortedByPrice[current_pos+1];
          this.sortedByPrice[current_pos+1] = temp;
          swapped = true;
        }
      }
      if (!swapped) {
        break;
      }
    }
    window.localStorage.setItem("SORTED", JSON.stringify(this.sortedByPrice));

    this.sortTriggered = true;
    this.FetchAll();
    this.sortTriggered = false;  
  };

  //////////////////////////////////////////////

  // CLEAR THE LIST

  this.Clear = async function() {
    console.log(this.doors);
    for (i = 0; i < this.doors.length; i++) {
      this.Delete(this.doors[i].id);
    }
    this.FetchAll();
    this.searchTriggered = false;
  };

  //////////////////////////////////////////////

  // CLOSE EDIT

  this.CloseInput = function() {
    document.getElementById('edit-spoiler').style.display = 'none';
  };

  this.StopSearch = function() {
    document.getElementById('search-producer').value = '';
    this.filteredByProducer = [];
    window.localStorage.removeItem("FILTERED");
  };

  //////////////////////////////////////////////

  // DISPLAY ADD FORM

  this.DisplayAddForm = function() {
    if (document.getElementById('add-form').style.display === 'none') {
      document.getElementById('add-form').style.display = 'block';
    } else {
      document.getElementById('add-form').style.display = 'none';
    }
  };

  //////////////////////////////////////////////

  // ADD FORM DATA VALIDATION

  document.getElementById('add-form').addEventListener('invalid', (function () {
    return function (e) {
      e.preventDefault();
      var modal = document.getElementById('add-modal');
      var span = document.getElementsByClassName('close')[0];
      
      modal.style.display = 'block';
      
      span.onclick = function() {
        modal.style.display = 'none';
      }

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      }
    };
  })(), true);

  //////////////////////////////////////////////

  // EDIT FORM DATA VALIDATION

  document.getElementById('edit-spoiler').addEventListener('invalid', (function () {
    return function (e) {
      e.preventDefault();
      var modal = document.getElementById('edit-modal');
      var span = document.getElementsByClassName('close')[0];
      
      modal.style.display = 'block';
      
      span.onclick = function() {
        modal.style.display = 'none';
      }

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = 'none';
        }
      }
    };
  })(), true);

  //////////////////////////////////////////////

};

app.FetchAll();