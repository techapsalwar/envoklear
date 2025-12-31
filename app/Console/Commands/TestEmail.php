<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestEmail extends Command
{
    protected $signature = 'test:email';
    protected $description = 'Test email configuration';

    public function handle()
    {
        $this->info('Testing email configuration...');
        
        try {
            Mail::raw('This is a test email from EnvoKlear Laravel application.', function ($message) {
                $message->to('techassistaps@gmail.com')
                    ->subject('Test Email from EnvoKlear');
            });
            
            $this->info('✅ Email sent successfully!');
            $this->info('Check envoclear@gmail.com inbox.');
        } catch (\Exception $e) {
            $this->error('❌ Failed to send email:');
            $this->error($e->getMessage());
        }
        
        return 0;
    }
}
