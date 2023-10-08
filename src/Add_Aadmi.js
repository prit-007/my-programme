import { Button, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddAadmi = () => {
  const api = "http://localhost:1969"
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    address: '',
    fbAvatar: '',
    accountBalance: '',
    age: '',
    expireince: '',
    image: '',
    Detail: '',
    id: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(api + '/' + id).then((res) => {
        return res.json()
      }).then((data) => {
        setData(data)
      })
    }
  }, [id]);

  const handleTextFieldChange = (e, field) => {
    setData({
      ...data,
      [field]: e.target.value
    });
  };
  const onEdit = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
        navigate('/')
      }
    })
  }
  return (
    <>
      <Stack rowGap={2} columnGap={2}>
        {['firstName', 'lastName', 'mobileNumber', 'address', 'fbAvatar', 'accountBalance', 'age', 'expireince', 'image', 'Detail'].map((temp) => {
          return <TextField id="outlined-basic" value={data[temp]} label={temp} variant="outlined" onChange={(e) => {
            handleTextFieldChange(e, temp)
          }} />

        })}
        <Button onClick={() => {
          console.log(data);
          if (id) {
            fetch(api + '/' + id, { method: 'PATCH', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
              .then((res) => {
                if (res.ok) {
                  navigate('/details/person/id/' + id);
                } else {
                  throw new Error('Failed to update data'); // Add error handling
                }
              })
              .catch((error) => {
                console.error('Error:', error);
                // Handle the error, e.g., show an error message to the user
              });
          } else {
            fetch(api, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
              .then((res) => {
                if (res.ok) {
                  navigate('/');
                } else {
                  throw new Error('Failed to submit data'); // Add error handling
                }
              })
              .catch((error) => {
                console.error('Error:', error);
                // Handle the error, e.g., show an error message to the user
              });
          }
        }} variant="contained">Submit</Button>
        <Button variant="contained" color='error' onClick={() => {
          onEdit();
        }} >Cancel</Button>
      </Stack>
    </>
  )
}

export default AddAadmi