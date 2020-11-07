import React from "react";
import "./studentCollection.css"

export default function StudentCollection({data, onSelect, onAddNew}){
    return <React.Fragment>
        {
            data.map((item)=>{
                return <section key={item.id} className="student-collection" onClick={e=>onSelect(item)}>
                            <p className="student-collection__info">{item.name}</p>
                        </section>
            })
        }
        <div className="student-collection--controls">
            <input type="button" value="Add new student" onClick={onAddNew}/>  
        </div>
    </React.Fragment>
}