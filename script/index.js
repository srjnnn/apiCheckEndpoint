class apiChecker{
      constructor(){
       this.isLoading = false;
      }

     
    //   validate the input
    checkInput(){
        const input = document.getElementById("input");
        const submit = document.querySelector("#submit");

        submit.addEventListener("click", ()=>{
            input.value.trim()===""? alert("url cannot be empty") : this.getUrlInfo(submit,input.value)
        })
    }

    async getUrlInfo(submit, url){
        if(this.isLoading) return;
        this.isLoading=true;
        submit.disabled=true;
        submit.textContent = "Fetching url data............"

        // Get the url data
        try{
            // aandi mandi sandi kasaile chalayexa vaney
          const secKey = "d2ef43fab2f937c61470b6c0cf713d09b1aeff1d3b491c16a33eaf389a5db942";

     const scanResponse = await fetch("https://www.virustotal.com/api/v3/urls", {
      method: "POST",
      headers: {
        "x-apikey": secKey,
        "content-type": "application/x-www-form-urlencoded"
      },
      body: `url=${encodeURIComponent(url)}`
    });

    const scanData = await scanResponse.json();
    const scanId = scanData.data.id;

    // 2. Fetch the report
    const reportResponse = await fetch(`https://www.virustotal.com/api/v3/analyses/${scanId}`, {
      headers: { "x-apikey": secKey }
    });
    const reportData = await reportResponse.json();
    console.log("Safety Report:", reportData);
     const result = document.getElementById("result")
    result.innerText += 
        reportData.data.attributes.results
        console.log("data : ", reportData.data.attributes.results)
        }catch(error){
    console.error("Error checking URL:", error);
    alert("Failed to check URL safety.");
        }finally{
this.isLoading = false;
    submit.disabled = false;
    submit.textContent = "Submit";
   
    // reportData.data.attributes.results

        }
    }


}
const checker = new apiChecker();
checker.checkInput();