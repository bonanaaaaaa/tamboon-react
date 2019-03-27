import React, { useState } from 'react'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Slide, { SlideProps } from '@material-ui/core/Slide'
import withMobileDialog, { InjectedProps } from '@material-ui/core/withMobileDialog'

import { ICharity } from '../data/charity'

const Transition: React.FunctionComponent<Omit<SlideProps, 'direction'>> = props => <Slide direction="up" {...props} />

const amountOptions = ['10', '20', '50', '100']

const DEFAULT_AMOUNT_OPTION = amountOptions[0]

interface Props extends InjectedProps {
  charity: ICharity
  onOk?: (donateAmount: number) => void
  onCancel?: () => void
  onChange?: (donateAmount: number) => void
  open: boolean
}

function DonateDialog({ charity, onOk, onCancel, onChange, open, fullScreen }: Props) {
  const [amount, setAmount] = useState(DEFAULT_AMOUNT_OPTION)

  const onEntering = () => {
    setAmount(DEFAULT_AMOUNT_OPTION)
  }
  const handleChange = (event: React.ChangeEvent<{}>, value: string) => {
    setAmount(value)
    if (onChange) onChange(+value)
  }
  const handleOk = () => onOk && onOk(+amount)
  const handleCancel = () => onCancel && onCancel()

  return (
    <Dialog fullScreen={fullScreen} open={open} onEntering={onEntering} TransitionComponent={Transition}>
      <DialogTitle>Donate to {charity.name}</DialogTitle>
      <DialogContent>
        <RadioGroup aria-label="Amount" name="amount" value={amount} onChange={handleChange}>
          {amountOptions.map(option => (
            <FormControlLabel value={option} key={option} control={<Radio />} label={`${option} ${charity.currency}`} />
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

const WrappedDonateDialog = withMobileDialog<Props>()(DonateDialog)

WrappedDonateDialog.displayName = 'DonateDialog'

export default WrappedDonateDialog
