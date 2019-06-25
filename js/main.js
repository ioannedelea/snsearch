const search = document.getElementById('search');
const matchList = document.getElementById('match-div');
const mainDiv = document.getElementById('match-list')

String.prototype.capitalize = function(lower) {
  return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};


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
    mainDiv.style = "display:none";
    
  }

  outputHtml(matches);

};

//Show results in html

const outputHtml = matches => {
  if (matches.length > 0) {

    


    mainDiv.style = "display:block";
    const html = matches.map(match => ` 
    <tr>

    <td><p class="text-left"><small class="font-weight-bold">${match.Solicitant}</small></p></td>
    <td><p class="text-left"><small>${match.ApartineDe.capitalize(true)}<small></p></td>
    <td><p class="text-center"><small class="pl-1 pr-1 mb-2 bg-primary text-white">${match.Punctaj}<small></p></td>
    <td><p class="text-right"><small class="font-weight-bold">${match.RezultatVerif.capitalize()}<small> <i class="fas fa-2x 
    ${match.RezultatVerif == 'Admis' ? 'text-success fa-check-circle' : (match.RezultatVerif == 'Respins' ? 'text-danger fa-times-circle' : 'text-primary fa-check-circle')}"></i>

    </p></td>
  </tr>  
    
    
    `).join('');




    matchList.innerHTML = html;
  }else{

  }
}

window.addEventListener('DOMContentLoaded', getCompanies);
search.addEventListener('input', () => searchCompanies(search.value));