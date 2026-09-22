

function FormButton({name , disabled}){
    return(
        <button type="submit" 
        disabled={disabled}
        className="h-12 mt-5 w-full rounded-lg bg-[#9061f9] text-sm font-semibold text-white shadow-lg shadow-[#9061f9]/20 transition hover:bg-[#a178ff] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a178ff]">
            {name}
          </button>
    )
}
export default FormButton