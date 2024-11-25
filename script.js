function createCarCard(car) {
    return `
        <div class="car-card">
            <div class="car-image">
                <img src="${car.image}" alt="${car.year} ${car.make} ${car.model}" 
                     onerror="this.src='/api/placeholder/400/300';this.onerror=null;" />
                <div class="image-overlay">
                    ${car.year} ${car.make} ${car.model}
                </div>
            </div>
            <div class="car-details">
                <div class="car-make-model">${car.year} ${car.make} ${car.model}</div>
                <div class="car-info">
                    <i class="fas fa-palette"></i>
                    Color: ${car.color}
                </div>
                <div class="car-info">
                    <i class="fas fa-road"></i>
                    ${car.mileage.toLocaleString()} miles
                </div>
                <div class="car-features">
                    <span class="feature-tag">${car.color}</span>
                    <span class="feature-tag">${car.mileage.toLocaleString()} miles</span>
                    <span class="feature-tag">${car.year}</span>
                </div>
                <div class="car-price">
                    <i class="fas fa-tag"></i>
                    $${car.price.toLocaleString()}
                </div>
            </div>
        </div>
    `;
}

function displayCars(cars) {
    const grid = document.getElementById('carsGrid');
    if (cars.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <h2>No cars match your criteria</h2>
                <p>Please adjust your filters and try again</p>
            </div>
        `;
        return;
    }
    grid.innerHTML = cars.map(car => createCarCard(car)).join('');
}

function applyFilters() {
    const yearMin = parseInt(document.getElementById('yearMin').value) || 1990;
    const yearMax = parseInt(document.getElementById('yearMax').value) || 2024;
    const selectedMakes = Array.from(document.getElementById('make').selectedOptions).map(option => option.value);
    const maxMileage = parseInt(document.getElementById('maxMileage').value) || Infinity;
    const priceMin = parseInt(document.getElementById('priceMin').value) || 0;
    const priceMax = parseInt(document.getElementById('priceMax').value) || Infinity;
    const selectedColors = Array.from(document.getElementById('color').selectedOptions).map(option => option.value);

    const filteredCars = usedCars.filter(car => {
        const meetsYearCriteria = car.year >= yearMin && car.year <= yearMax;
        const meetsMakeCriteria = selectedMakes.length === 0 || selectedMakes.includes(car.make);
        const meetsMileageCriteria = car.mileage <= maxMileage;
        const meetsPriceCriteria = car.price >= priceMin && car.price <= priceMax;
        const meetsColorCriteria = selectedColors.length === 0 || selectedColors.includes(car.color);

        return meetsYearCriteria && meetsMakeCriteria && meetsMileageCriteria && 
               meetsPriceCriteria && meetsColorCriteria;
    });

    displayCars(filteredCars);
}

document.addEventListener('DOMContentLoaded', () => {
    displayCars(usedCars);
});