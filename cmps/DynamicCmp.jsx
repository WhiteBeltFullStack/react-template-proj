import { StarRating } from '../cmps/StarRating.jsx'
import { SelectRating } from '../cmps/SelectRating.jsx'
import { NumberInputRating } from '../cmps/NumberInputRating.jsx'

export function DynamicCmp(props){

    switch (props.cmpType) {
        case 'select':
            return <SelectRating {...props}/>
        case 'numInput':
            return <NumberInputRating  {...props}/>
        case 'stars':
            return <StarRating  {...props}/>

        default:
            return null
            break;
    }
}