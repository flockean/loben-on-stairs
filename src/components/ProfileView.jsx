'use client'

import { useState } from 'react'
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Switch } from "./ui/switch"
import { Home, Plus, User, ArrowLeft, Lock, Shield } from "lucide-react"

export default function Profile() {
  const [privacySettings, setPrivacySettings] = useState({
    visible: false,
    publicPraise: false,
    praiseTurnedOff: false,
  })

  const handlePasswordChange = (e) => {
    e.preventDefault()
    // Here you would typically handle the password change logic
    console.log('Password change submitted')
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
      </div>

      {/* Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background">
        <div className="flex justify-around p-4">
          <Button variant="ghost" size="icon">
            <Home className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Plus className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
