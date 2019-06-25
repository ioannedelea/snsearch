const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

let companies;

const getCompanies = async() => {
  const res = await fetch('data/lista_firme.json');
  companies = await res.json();
}

// Search the lista_firme.json and filter it
const searchCompanies = async searchText => {

  //Get matches to current text input
  let matches = companies.filter(company =>{
    const regex = new RegExp(`^${searchText}`, 'gi');
    return company.Solicitant.match(regex);
  });


  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = '';
    
  }
 // console.log(matches);
  outputHtml(matches);

};

//Show results in html

const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches.map(match => `
    <div class="card card-body mb-1">
      <h5 class="text-primary">${match.Solicitant} (${match.ApartineDe})
      <br/><span class="text-secondary">Status:</span>
      
      <span class="${match.RezultatVerif == 'Admis' ? 'text-success' : 'text-danger'}">
      ${match.RezultatVerif}
      </span></h5>
      <small>Punctaj: <span class='text-primary'>${match.Punctaj}</span></small>
      <small>Suma aprobata: <span class='text-info'>${match.SumaAprobata}<span></small>
    </div>
    
    `).join('');
    matchList.innerHTML = html;
  }else{
    const html = matches.map(match => `
    <div class="card card-body mb-1">
      <small>No matches for this company</small>
    </div> `).join('');
    matchList.innerHTML = html;
  }
}

window.addEventListener('DOMContentLoaded', getCompanies);
search.addEventListener('input', () => searchCompanies(search.value));