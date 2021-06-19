<?php

namespace Tests\Feature;

use Tests\TestCase;

class AdminControllerTest extends TestCase
{
    /**
     * There is a response with the OK status.
     * @return bool
     */
    public function test_index_exists()
    {
        $response = $this->get('/manager');

        $response->assertStatus(200);
    }

    /**
     * There is a renderable view
     * @return bool
     */
    public function test_index_view_exists()
    {
        $view = $this->view('admin.index');

        $view->assertSee('Hello');
    }
}