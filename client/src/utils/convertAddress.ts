
export function converAdrress( city:string, street:string | null, building:string | null, flat:string | null ):string{
    let address = city;
    if(street){
        address+=`, ${street}`;
    } 
    if(building){
        address+=`, ${building}`;
    }
    if(flat){
        address+=`, ${flat}`;
    }
    return address
}