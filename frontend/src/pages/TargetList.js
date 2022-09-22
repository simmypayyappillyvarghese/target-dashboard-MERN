import { useEffect, useState } from "react";

function TargetList() {

  const [targetData, setTargetData] = useState([]);
  const [error,setError]=useState("");


  //Fetch Data Call to get all the Targets Info
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/targets/");
      const data = await response.json();

      const targetArray=formatData(data);
      setTargetData(targetArray);
    } catch (e) {
      console.log(e);
    }
  };


  //To format the data return by fetch call before setting it as state

  function formatData(data){

    //Only add mac_addr and name to the state array
    const targetArray = [];
    for (let obj of data) {
      targetArray.push({ mac_addr: obj.mac_addr, name: obj.name ,tags:obj.tags});
    }

    return targetArray

  }


  //useEffect defined to get data using fetch call in the initial render/page loading

  useEffect(() => {
    getData();
  }, []);



/*************Q1****************/

  //Invoked when user clicks the Change the Name Button
  //Identify the selected radiobutton and fetch its respective li items mac_address
  //Fetch the value entered in teh input box
  //Make a fetch call with the mac address and update the name with new value
  //Update the target state array using setTargetData

  async function editNamehandler(e) {

    setError("");
    const targets = document.querySelectorAll('input[name="target"]');

    let selectedTarget, arrayIndex;
    targets.forEach((target, index) => {
      if (target.checked) {
        selectedTarget = target;
        arrayIndex = index;
      }
    });

    const newValue = document.querySelector("#editName").value.trim();

    if(!selectedTarget || newValue.length==0 ){

        setError("Please select a target and enter a name to change the target name");
        return;
        
    }

    
    const mac_addr = selectedTarget.parentElement.dataset.id;

  

    const updatedInfo = await fetch(
      `http://localhost:8000/api/targets/${mac_addr}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ name: newValue }),
      }
    );

    //Updating the object value with new value entered in the textbox

    targetData[arrayIndex]["mac_addr"] = mac_addr;
    targetData[arrayIndex]["name"] = newValue;

    const newData=[...targetData]
    //Assigning a new copy of array to be rendered in the frontend
    setTargetData(newData);
    
    
  }

/*************Q2****************/


//Filter handler
//Fetch Call to get the data based on  the name entered in search box
//If succesful,set the state and render the component
//Else set the error and display it

  async function filterTargets(){

    setError("");

    const filterParam=document.querySelector("#filterName").value;
 
    if(filterParam.length==0){
        setError("Enter a name to search for the target")
        return;
    }

    const response=await fetch(`http://localhost:8000/api/targets/filter/${filterParam}`)
    const data=await response.json();

      if(data.length==0){
 
            setError("No data found with this name.Please try again")
            return;
      }
  

        const filteredArray=formatData(data);
        setTargetData(filteredArray);
      

  }

/*************Q3****************/
//Filter by Tag handler
//Fetch Call to get the data based on the tag entered to search box
//If successful ,Updates the state with the filtered data and rerender the component
//Else set the Error and display it

  async function filterByTag(){

    setError("");

    const filterParam=document.querySelector("#filterTags").value;
 
    if(filterParam.length==0){
        setError("Enter a tag to search for the target")
        return;
    }

    const response=await fetch(`http://localhost:8000/api/targets/filterTag/${filterParam}`)
    const data=await response.json();
   
      if(data.length===0){
 
            setError("No data found with this name.Please try again");
           return;
      }
      else{

        const filteredArray=formatData(data); 
        setTargetData(filteredArray);
      }



  }



  //Clear the Error message
  function selectHandler(){
    setError("");
  }


  //Clear Filter to clear the filtered list and return the original target list
  function clearFilter(){
    setError("");
    getData();
    document.querySelector("#filterName").value="";
    document.querySelector("#filterTags").value="";

  } 

  //If the filter input box has no value,user clear the name 
 // display original data

  function filterChangeHandler(e){
    if(e.target.value.length==0){
        clearFilter();
    }

  }




  return (
    <>
      <main className="container my-4">
      <p>Target Information</p>
        <div className="d-flex justify-content-center align-items-center my-4 ">
          <input id="editName" className="mx-2" />
          <button onClick={editNamehandler} className="btn btn-info">
            Change the Name
          </button>

          <input id="filterName" className="mx-2" onChange={filterChangeHandler}/>
          <button onClick={filterTargets} className="btn btn-primary">
            Filter  By Name
          </button>
          <input id="filterTags" className="mx-2" onChange={filterChangeHandler}/>
          <button onClick={filterByTag} className="btn btn-primary">
            Filter  By Tag
          </button>
          <button onClick={clearFilter} className="btn btn-primary mx-2">
            Clear Filter
          </button>

        </div>
        <ul className="target-list row">
          {targetData.map((el, index) => {
            return (
              <li  key={el.mac_addr}
                className="d-flex justify-content-start align-items-center my-2 target-list"
              >
                <div 
                data-id={el.mac_addr}
                className="col-md-12 px-3">
                <input type="radio" name="target" onClick={selectHandler}/>
                <span>{el.mac_addr}</span>
                <span>,{el.name}</span>,
                <p>tags: [
                    {
                    el.tags.map((tag,index)=>{

                        return(
                            <span key={index}>{tag},</span>
                        )
                    })
                    }]
                </p>                    
               </div>
              </li>
            );
          })}
        </ul>
        <p id="text-error" className="text-danger">{error}</p>
      </main>
    </>
  );
}


export default TargetList;


