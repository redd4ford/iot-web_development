var app = new function() {
  this.el = document.getElementById('doors');

  this.doors = [];
  this.filteredByProducer = [];
  this.sortedByPrice = [];

  this.sortTriggered = false;
  this.searchTriggered = false;

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

  this.Clear = function() {
    window.localStorage.clear();
    location.reload();
    this.searchTriggered = false;
  };
  
  this.FetchAll = function() {
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
      if (window.localStorage.getItem("DOORS")) {
        this.doors = JSON.parse(window.localStorage.getItem("DOORS"));
      }
      
      array = this.doors;
    }

    if (array.length > 0) {
      for (i = 0; i < array.length; i++) {
        data += '<tr>';
        data += '<td>' + (i+1) + '   Price: ' + array[i].price + '   </td>';
        data += '<td>   Producer: ' + array[i].producer + '   </td>';
        data += '<td>   Wood Type: ' + array[i].woodType + '   </td>';
        data += '<td>   Color: ' + array[i].color + '   </td>';
        data += '<td>   Height: ' + array[i].height + '   </td>';
        data += '<td>   Weight: ' + array[i].weight + '   </td>';
        data += '<td><button onclick="app.Edit(' + i + ')">Edit</button></td>';
        data += '<td><button onclick="app.Delete(' + i + ')">Delete</button></td>';
        data += '</tr>';
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

  this.Add = function () {
    price = Number(document.getElementById('add-price').value);
    producer = document.getElementById('add-producer').value;
    woodType = document.getElementById('add-woodtype').value;
    color = document.getElementById('add-color').value;
    height = Number(document.getElementById('add-height').value);
    weight = Number(document.getElementById('add-weight').value);

    this.doors.push({
        price: price,
        producer: producer,
        woodType: woodType,
        color: color,
        height: height,
        weight: weight
    });

    window.localStorage.setItem("DOORS", JSON.stringify(this.doors));

    // Reset input value

    price = '';
    producer = '';
    woodType = '';
    color = '';
    height = '';
    weight = '';
    
    this.FetchAll();
  };

  this.Edit = function (item) {
    price = document.getElementById('edit-price');
    producer = document.getElementById('edit-producer');
    woodType = document.getElementById('edit-woodtype');
    color = document.getElementById('edit-color');
    height = document.getElementById('edit-height');
    weight = document.getElementById('edit-weight');

    price.value = Number(this.doors[item].price);
    producer.value = this.doors[item].producer;
    woodType.value = this.doors[item].woodType;
    color.value = this.doors[item].color;
    height.value = Number(this.doors[item].height);
    weight.value = Number(this.doors[item].weight);

    document.getElementById('edit-spoiler').style.display = 'block';
    self = this;

    document.getElementById('saveEdit').onsubmit = function() {

        // Get value

        price = Number(document.getElementById('edit-price').value);
        producer = document.getElementById('edit-producer').value;
        woodType = document.getElementById('edit-woodtype').value;
        color = document.getElementById('edit-color').value;
        height = Number(document.getElementById('edit-height').value);
        weight = Number(document.getElementById('edit-weight').value);

        // Edit value

        self.doors[item] = {
            price: price,
            producer: producer,
            woodType: woodType,
            color: color,
            height: height,
            weight: weight
        };

        window.localStorage.setItem("DOORS", JSON.stringify(self.doors));

        self.FetchAll();
        self.CloseInput();
    }
  };

  this.SearchByProducer = function() {

    producer = document.getElementById('search-producer').value;
    this.searchTriggered = false;

    if (producer) {
      for (i = 0; i < this.doors.length; i++) {
        if (this.doors[i].producer === producer) {
          this.filteredByProducer.push(this.doors[i]);
          window.localStorage.setItem("FILTERED", JSON.stringify(this.filteredByProducer));
        }
      }

      producer = '';

    this.searchTriggered = true;
    }
    this.FetchAll();
    this.searchTriggered = false;
  };

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

  this.Delete = function (item) {
    // Delete the current row
    this.doors.splice(item, 1);
    window.localStorage.setItem("DOORS", JSON.stringify(this.doors));
    // Display the new list
    this.FetchAll();
  };
  
  this.CloseInput = function() {
    document.getElementById('edit-spoiler').style.display = 'none';
  };

  this.StopSearch = function() {
    document.getElementById('search-producer').value = '';
    this.filteredByProducer = [];
    window.localStorage.removeItem("FILTERED");
  };

};

app.FetchAll();