interface Item{
  type: "book" | "electronics" | "clothing";
  id: string;
  price: number;
}

interface Book extends Item {
  type: "book";
  title: string;
  author: string;
}

interface Electronics extends Item{
  type: "electronics";
  item: string;
  model: string;
  warranty?: number;
}

interface Clothing extends Item{
  type: "clothing";
  item: string;
  brand: string;
  size?: "S" | "M" | "L";
}

type Product = Book | Electronics | Clothing;

class Collection <T> {
  items: T[];

  constructor(items: T[]) {
    this.items = items;
  }

  getAll() {
    return this.items;
  }

  filter(callback: (item: T) => boolean): T[] {
    return this.items.filter(callback);
  }
}

function renderProduct(product: Product): string {
  let info = "";

  if (product.type === "book") {
    info = `Book: ${product.title} by ${product.author}`;
  } else if (product.type === "electronics") {
    info = `Electronics: ${product.item} - ${product.model}`;

    if (product.warranty) {
      info += ` - Warranty: ${product.warranty} year(s)`;
    }
  } else if (product.type === "clothing") {
    info = `Clothing: ${product.item} by ${product.brand}`;

    if (product.size) {
      info += ` - Size ${product.size}`;
    }
  } else {
    throw new Error(`Unknown product type: ${JSON.stringify(product)}`);
  }

  return `
  <p class="item" id=${product.id}>${product.id}</p>
  <p class="price">${product.price}</p>
  <p>${info}</p>
  `;
}

const products: Collection<Product> = new Collection<Product>([
  {
    type: "book",
    id: "1",
    price: 14.99,
    title: "Dune",
    author: "Frank Herbert"
  },
  {
    type: "electronics",
    id: "2",
    price: 349.99,
    item: "Tablet",
    model: "Pixelon Slate",
    warranty: 2
  },
  {
    type: "clothing",
    id: "3",
    price: 89.99,
    item: "Jacket",
    brand: "North Face",
    size: "M"
  }
]);

const output = document.querySelector<HTMLDivElement>("#output")!;
const allButton = document.querySelector<HTMLButtonElement>("#all")!;
const booksButton = document.querySelector<HTMLButtonElement>("#books")!;
const electronicsButton = document.querySelector<HTMLButtonElement>("#electronics")!;
const clothingButton = document.querySelector<HTMLButtonElement>("#clothing")!;

function showProducts(type?: Product["type"]) {
  const filteredProducts = type ? 
  products.filter(product => product.type === type) : 
  products.getAll();

  output.innerHTML = filteredProducts.map(product => renderProduct(product)).join("");

}

allButton.addEventListener(
  "click", () => showProducts()
);

booksButton.addEventListener(
  "click", () => showProducts("book")
);

electronicsButton.addEventListener(
  "click", () => showProducts("electronics")
);

clothingButton.addEventListener(
  "click", () => showProducts("clothing")
);


  document.addEventListener(
    "DOMContentLoaded", () => {
      showProducts();
    }
  );
