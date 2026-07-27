type Category =
  | 'Sport'
  | 'Cruiser'
  | 'Touring'
  | 'Dirt'
  | 'Adventure'
  | 'Naked'
  | 'Electric';

interface Motorcycle {
  id: string;
  name: string;
  manufacturer: string;
  category: Category;
  price: number;
  image_url: string;
  created_at: Date;
  description: string;
  year: number;
  engine?: string;
  horsepower?: number | string;
}

const fetchMotorcycles = (): Promise<Motorcycle[]> => {
  return fetch("https://cdn.freecodecamp.org/curriculum/labs/data/motorcycles.json")
    .then((res) => res.json());
};

const renderMotorcycleCard = (motorcycle: Motorcycle): string => {
  const engineVal = motorcycle.engine ?? motorcycle.horsepower ?? "N/A";

  return `
    <div class="motorcycle-card">
      <img class="motorcycle-card-image-container" src="${motorcycle.image_url}" alt="${motorcycle.name}" />
      <span class="motorcycle-card-year-badge">${motorcycle.year}</span>
      <h3 class="motorcycle-card-title">${motorcycle.name}</h3>
      <p class="motorcycle-card-manufacturer">${motorcycle.manufacturer}</p>
      <span class="motorcycle-card-category">${motorcycle.category}</span>
      <p class="motorcycle-card-description">${motorcycle.description}</p>
      <p class="motorcycle-card-price">${motorcycle.price}</p>
      <p class="motorcycle-card-engine">${engineVal}</p>
    </div>
  `;
};

class MotorcycleGalleryApp {
  private allMotorcycles: Motorcycle[];

  constructor() {
    this.allMotorcycles = [];
    this.loadMotorcycles();
    this.setupFilter();
  }

  private loadMotorcycles(): void {
    fetchMotorcycles().then((data) => {
      this.allMotorcycles = data;
      this.renderMotorcycles();
    });
  }

  private setupFilter(): void {
    const input = document.getElementById("name-filter-input") as HTMLInputElement | null;
    if (!input) return;

    input.addEventListener("input", () => {
      const term = input.value.toLowerCase().trim();
      const filtered = this.allMotorcycles.filter((m) =>
        m.name.toLowerCase().includes(term)
      );
      this.renderMotorcycles(filtered);
    });
  }

  public renderMotorcycles(motorcycles?: Motorcycle[]): void {
    const listToRender = motorcycles ?? this.allMotorcycles;

    if (!listToRender || listToRender.length === 0) {
      return;
    }

    const grid = document.getElementById("motorcycle-grid");
    const resultsNumber = document.getElementById("results-number");

    if (resultsNumber) {
      resultsNumber.textContent = `${listToRender.length}`;
    }

    if (grid) {
      grid.innerHTML = listToRender.map(renderMotorcycleCard).join("");
    }
  }
}

new MotorcycleGalleryApp();
