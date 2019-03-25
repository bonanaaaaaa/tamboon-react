import React, {useState} from 'react'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Slide from '@material-ui/core/Slide'
import withMobileDialog from '@material-ui/core/withMobileDialog';

import Charity from '../types/charity';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const amountOptions = ['10', '20', '50', '100']

type Props = {
  charity: Charity | {};
  onOk?: (number) => any;
  onCancel?: () => any;
  onChange?: (number) => any;
  open: boolean;
}

function DonateDialog ({
  charity,
  onOk,
  onCancel,
  onChange,
  open,
  fullScreen
}) {
  const [amount, setAmount] = useState(amountOptions[0])

  const onEntering = () => {
    setAmount(amountOptions[0])
  }
  const handleChange = (event, value) => {
    setAmount(value)
    if (onChange) onChange(+value)
  }
  const handleOk = () => onOk(+amount)
  const handleCancel = () => onCancel()

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onEntering={onEntering}
      TransitionComponent={Transition}
    >
      <DialogTitle>Donate to {charity.name}</DialogTitle>
      <DialogContent>
        <RadioGroup
          aria-label="Amount"
          name="amount"
          value={amount}
          onChange={handleChange}
        >
          {amountOptions.map(option => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio />}
              label={`${option} ${charity.currency}`}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary">
          Donate
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withMobileDialog<Props>()(DonateDialog)