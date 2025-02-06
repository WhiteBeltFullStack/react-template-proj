

const {useState} = React

export function BookCount({pageCount}){


    function readingDifficulty(pageCount){

        if (pageCount > 500) return 'Serious Reading'
        if (pageCount > 200) return 'Decent Reading'
        return 'Light Reading'
    }

    return (
        <section>
            <strong>Page Count: {pageCount} </strong> 
            <p>{readingDifficulty(pageCount)} </p> 

        </section>
    )
}