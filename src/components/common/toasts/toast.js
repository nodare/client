import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import PropTypes from 'prop-types'

function HotToast(props) {
    return (
        <>
            <Toaster
                position="bottom-right"
                reverseOrder={true}
            >
            </Toaster>
        </>
    )
}

export { HotToast }