'use client'

import {useState} from 'react'
import {Button} from "./ui/button"
import {Input} from "./ui/input"
import {Switch} from "./ui/switch"
import {Lock, LogOut, Shield, User} from "lucide-react"
import {useNavigate} from 'react-router-dom'
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from "./ui/dialog"
import Navbar from "./Navbar";

export default function Profile() {
  const navigate = useNavigate()
  const [privacySettings, setPrivacySettings] = useState({
    visible: false,
    publicPraise: false,
    praiseTurnedOff: false,
  })
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handlePasswordChange = (e) => {
    e.preventDefault()
    // Show the popup
    setIsPopupOpen(true)
    // Close the popup after 2 seconds
    setTimeout(() => setIsPopupOpen(false), 2000)
  }

  const handleLogout = () => {
    console.log('Logging out')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="flex items-center p-4">
          <User className="h-8 w-8 mr-2" />
          <div>
            <h2 className="font-semibold">HansRenner123</h2>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <span>2 Gelobt</span>
              <span>10 Lobe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-8 pb-20">
        {/* Datenschutz Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Datenschutz
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="visible">Sichtbar für andere</label>
              <Switch
                id="visible"
                checked={privacySettings.visible}
                onCheckedChange={(checked) =>
                  setPrivacySettings(prev => ({...prev, visible: checked}))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="publicPraise">Lobe öffentlich</label>
              <Switch
                id="publicPraise"
                checked={privacySettings.publicPraise}
                onCheckedChange={(checked) =>
                  setPrivacySettings(prev => ({...prev, publicPraise: checked}))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="praiseTurnedOff">Lobe ausgestellt</label>
              <Switch
                id="praiseTurnedOff"
                checked={privacySettings.praiseTurnedOff}
                onCheckedChange={(checked) =>
                  setPrivacySettings(prev => ({...prev, praiseTurnedOff: checked}))
                }
              />
            </div>
          </div>
        </div>

        {/* Passwort ändern Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Lock className="mr-2 h-5 w-5" />
            Passwort ändern
          </h3>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <Input
              type="password"
              placeholder="Aktuelles Passwort"
              required
            />
            <Input
              type="password"
              placeholder="Neues Passwort"
              required
            />
            <Input
              type="password"
              placeholder="Wiederhole neues Passwort"
              required
            />
            <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-200">
              Passwort ändern
            </Button>
          </form>
        </div>

        {/* Logout Button */}
        <div className="space-y-4">
          <Button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Abmelden
          </Button>
        </div>
      </div>

      {/* Navigation Bar */}
      <Navbar/>

      {/* Password Change Popup */}
      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Passwortänderung</DialogTitle>
            <DialogDescription>
              Passwort wurde erfolgreich geändert!
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
