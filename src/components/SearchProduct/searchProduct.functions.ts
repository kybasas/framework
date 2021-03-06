export function renderProductItems(array: any, page: number, range: number) {
  let end = range * page;
  const start = end - range;
  const length = array.length;
  
  if (end > length) {
    end = length;
  }

  let markup = "";
  let energy;

  if (array.length) {
    for (let i = start; i < end; i++) {
      const item = array[i];
      energy = findField(item, "Energy") ? findField(item, "Energy") : 0;

      markup += `
          <a href="#search/${item.fdcId}" class="black-color ${
        energy ? "" : "cursor-default"
      }">
            <div class="search-product--item ${
              energy ? "background-hover " : "disable"
            } " ${energy ? `data-type="product" data-id="${item.fdcId}"` : ""} >
                <div>
                    <div class="search-product__name">Name: <span>${
                      item.description
                    }</span></div>
                    <div class="search-product__description">Brand: <span>${
                      item.brandOwner ? item.brandOwner : "NONE BRAND"
                    }</span></div>
                </div>
                <div>Ccal: <span class="green-color"> ${
                  energy ? energy.amount : "NONE"
                }</span></div>
            </div>
          </a>
      `;
    }
  } else {
    markup += `<div class="not-found">Not found Product!</div>`;
  }
  return markup;
}

function findField(item: any, field: string) {
  return item.foodNutrients.find((item: any) => item.name === field);
}
