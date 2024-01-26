const pierceWord = (user: {name: string})=>{
    let splits =  user && user?.name.split(" ")
    let Join = ""
    if(splits){ 
     let Firstchar = splits[0].charAt(0)
     let lastSent = splits[splits.length-1]
     let splitLastSent = lastSent.split("")
    let lastMan =  splitLastSent[splitLastSent.length-1]
     Join += `${Firstchar} ${lastMan}`
   }
   return Join.toUpperCase()
   }

   
   export default pierceWord