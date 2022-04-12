import React from 'react'

export default function AlertComponent(props) {
    return (
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
            {props.msg}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    )
}
